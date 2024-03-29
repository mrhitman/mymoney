import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { omit } from 'lodash';
import Currency from 'src/database/models/currency.model';
import Transaction from 'src/database/models/transaction.model';
import UserCategory from 'src/database/models/user-category.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { TransactionType } from 'src/transactions/transaction-type';
import { v4 as uuid } from 'uuid';
import { BudgetsService } from '../budgets/budgets.service';

export interface CurrencyResponse {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateSell: number;
  rateBuy: number;
  rateCross: number;
}

export interface ClientInfoResponse {
  name: string;
  webHookUrl: string;
  accounts: Array<{
    id: string;
    balance: number;
    creditLimit: number;
    currencyCode: number;
    cashbackType: string;
    maskedPan: string[];
    type: string;
  }>;
}

export interface StatementResponse {
  id: string;
  time: number;
  description: string;
  mcc: number;
  hold: boolean;
  amount: number;
  operationAmount: number;
  currencyCode: number;
  commissionRate: number;
  cashbackAmount: number;
  balance: number;
}

@Injectable()
export class MonobankProvider {
  protected client: AxiosInstance;

  constructor(protected budgetService: BudgetsService) {
    this.client = axios.create({
      baseURL: 'https://api.monobank.ua/',
    });
  }

  public async getBankCurrency(): Promise<CurrencyResponse[]> {
    try {
      const response = await this.client.get<CurrencyResponse[]>('bank/currency');
      return response.data;
    } catch (e) {
      return e.message;
    }
  }

  public async getClientInfo(token = ''): Promise<ClientInfoResponse> {
    try {
      const response = await this.client.get<ClientInfoResponse>('personal/client-info', {
        headers: { 'X-Token': token },
      });
      return response.data;
    } catch (e) {
      return e.message;
    }
  }

  public async getStatements(
    from: number,
    to: number,
    account = '0',
    token = '',
  ): Promise<StatementResponse[]> {
    try {
      const response = await this.client.get<StatementResponse[]>(
        `personal/statement/${account}/${from}/${to}`,
        {
          headers: { 'X-Token': token },
        },
      );
      return response.data;
    } catch (e) {
      return e.message;
    }
  }

  public async import(user: User, token = '') {
    const clientInfo = await this.getClientInfo(token);
    const to = ~~(+new Date() / 1000);
    const from = to - 31 * 24 * 60 * 60;

    for (const account of clientInfo.accounts) {
      const currency = await Currency.query()
        .select(['id'])
        .findOne({ code: account.currencyCode });

      const wallet = await Wallet.query()
        .where({ userId: user.id })
        .whereRaw(`meta ->> 'id' = '${account.id}'`)
        .andWhere({ isImported: true })
        .first();

      const walletData = {
        id: wallet?.id || uuid(),
        userId: user.id,
        name: account.maskedPan.join(''),
        type: 'monobank-' + account.type,
        description: 'imported from monobank',
        meta: JSON.stringify(account),
        isImported: true,
        pockets: [
          {
            currencyId: currency.id,
            amount: (account.balance - account.creditLimit) / 100,
          },
        ],
      };

      if (wallet) {
        Logger.log('Import wallet, update', 'MONO');
        await wallet.$query().update(omit(walletData, 'id'));
      } else {
        Logger.log('Import wallet, create', 'MONO');
        await Wallet.query().insert(walletData);
      }

      const statements = await this.getStatements(from, to, account.id, token);
      const categories = await UserCategory.query().where({ userId: user.id });
      for (const statement of statements) {
        const type = statement.amount > 0 ? TransactionType.income : TransactionType.outcome;
        let category = categories.find((c) => c.codes.includes(statement.mcc));

        if (!category) {
          category = categories.find(
            (c) => c.type === type.toString() && c.name === 'SYSTEM_EMPTY',
          );
        }

        let trx = await Transaction.query()
          .where({ userId: user.id })
          .andWhere({ isImported: true })
          .andWhereRaw(`meta ->> 'id' = '${statement.id}'`)
          .first();

        if (trx) {
          continue;
        }

        const trxData = {
          id: uuid(),
          description: statement.description,
          amount: Math.abs(statement.amount) / 100,
          userId: user.id,
          categoryId: category.id,
          currencyId: currency.id,
          type,
          date: new Date(statement.time * 1000),
          meta: JSON.stringify(statement),
          isImported: true,
        } as Partial<Transaction>;

        if (type === TransactionType.income) {
          trxData.destinationWalletId = walletData.id;
        }

        if (type === TransactionType.outcome) {
          trxData.sourceWalletId = walletData.id;
        }

        trx = await Transaction.query().insert(trxData);
        await this.budgetService[type](user, trx);
      }
    }
  }
}
