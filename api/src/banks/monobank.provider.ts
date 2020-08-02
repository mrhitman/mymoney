import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import Category from 'src/database/models/category.model';
import Currency from 'src/database/models/currency.model';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { TransactionType } from 'src/transactions/transaction-type';

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
  }>
}

export interface StatementResponse {
  id: string;
  time: number;
  description: string,
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

  constructor() {
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

  public async getClientInfo(token: string = ''): Promise<ClientInfoResponse> {
    try {
      const response = await this.client.get<ClientInfoResponse>('personal/client-info', {
        headers: { 'X-Token': token },
      });
      return response.data;
    } catch (e) {
      return e.message;
    }
  }

  public async getStatements(from: number, to: number, account: string = '0', token: string = ''): Promise<StatementResponse[]> {
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

  public async import(user: User, token: string = '') {
    const clientInfo = await this.getClientInfo(token);
    const to = ~~(+new Date() / 1000);
    const from = to - 31 * 24 * 60 * 60;

    for (let account of clientInfo.accounts) {
      const currency = await Currency
        .query()
        .select(['id'])
        .findOne({ code: account.currencyCode });

      const wallet = await Wallet.query().findById(account.id);
      const walletData = {
        id: account.id,
        userId: user.id,
        name: account.maskedPan.join(''),
        type: 'monobank-' + account.type,
        description: 'imported from monobank',
        pockets: [
          {
            currencyId: currency.id,
            amount: (account.balance - account.creditLimit) / 100
          }
        ]
      }

      if (wallet) {
        await wallet.$query().update(walletData);
      } else {
        await Wallet.query().insert(walletData);
      }

      const statements = await this.getStatements(from, to, account.id, token);
      const categories = await Category.query();
      for (let statement of statements) {
        const type = statement.amount > 0 ? TransactionType.income : TransactionType.outcome;
        let category = categories.find(c => c.codes.includes(statement.mcc));

        if (!category) {
          category = categories.find(c => c.type === type.toString() && c.name === 'SYSTEM_EMPTY')
        }

        const trx = await Transaction.query().findById(statement.id);

        if (trx) {
          continue;
        }

        const trxData = {
          id: statement.id,
          description: statement.description,
          amount: Math.abs(statement.amount) / 100,
          userId: user.id,
          categoryId: category.id,
          currencyId: currency.id,
          type,
          date: new Date(statement.time * 1000),
          additional: JSON.stringify(statement)
        } as Partial<Transaction>;

        if (type === TransactionType.income) {
          trxData.destinationWalletId = account.id;
        }

        if (type === TransactionType.outcome) {
          trxData.sourceWalletId = account.id;
        }

        await Transaction.query().insert(trxData);
      }
    }
  }
}
