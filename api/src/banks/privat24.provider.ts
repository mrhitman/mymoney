import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { createHash } from 'crypto';
import { omit } from 'lodash';
import { DateTime } from 'luxon';
import Currency from 'src/database/models/currency.model';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { TransactionType } from 'src/transactions/transaction-type';
import { v4 as uuid } from 'uuid';
import { toJson } from 'xml2json';

interface GetClientInfoResponse {
  info: {
    cardbalance: {
      card: {
        account: string;
        card_number: string;
        acc_name: {};
        acc_type: {};
        currency: string;
        card_type: {};
        main_card_number: string;
        card_stat: {};
        src: {};
      };
      av_balance: string;
      bal_date: string;
      bal_dyn: string;
      balance: string;
      fin_limit: string;
      trade_limit: string;
    };
  };
}

interface GetStatementsResponse {
  info: {
    statements: {
      status: string;
      credit: string;
      debet: string;
      statement: Array<{
        card: string;
        appcode: string;
        trandate: string; // eg. 2020-08-07
        trantime: string; // eg. 15:18:00
        amount: string; // eg 780.00 UAH,
        cardamount: string; // eg 780.00 UAH
        rest: string; // eg 780.00 UAH
        terminal: string;
        description: string;
      }>;
    };
  };
}

@Injectable()
export class Privat24Provider {
  protected client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.privatbank.ua/p24api/',
    });
  }

  public async import(user: User, id: string, token: string) {
    const account = await this.getClientInfo(id, token);

    if (!account?.info?.cardbalance?.card) {
      return;
    }

    const currency = await Currency.query()
      .select(['id'])
      .findOne({ name: account.info?.cardbalance?.card?.currency });

    const wallet = await Wallet.query()
      .where({ isImported: true })
      .andWhereRaw(`meta->> 'account' = '${account.info.cardbalance.card.account}'`)
      .first();
    const walletData = {
      id: wallet.id || uuid(),
      userId: user.id,
      name: account.info.cardbalance.card.card_number,
      type: 'Privat24 Card',
      description: 'imported from privat24',
      isImported: true,
      meta: JSON.stringify(account.info.cardbalance.card),
      pockets: [
        {
          currencyId: currency.id,
          amount: parseFloat(account.info.cardbalance.balance),
        },
      ],
    };

    if (wallet) {
      await wallet.$query().update(omit(walletData, 'id'));
    } else {
      await Wallet.query().insert(walletData);
    }

    const to = DateTime.local().toFormat('dd.MM.yyyy');
    const from = DateTime.local().minus({ month: 1 }).toFormat('dd.MM.yyyy');

    const statements = await this.getStatements(id, token, from, to);

    if (statements) {
      for (const statement of statements.info.statements.statement) {
        const trx = await Transaction.query()
          .where({ isImported: true })
          .andWhereRaw(`meta->> 'appcode' = '${statement.appcode}'`)
          .first();

        if (trx) {
          continue;
        }

        const amount = parseFloat(statement.cardamount);
        const type = amount > 0 ? TransactionType.income : TransactionType.outcome;
        const categoryInId = '39da1fbc-1937-41b2-a46f-d2dce9a1f788';
        const categoryOutId = '07c0ba04-d1a2-4a17-b526-ac7bb80e78b1';
        const trxData = {
          id: statement.appcode,
          description: statement.description,
          amount: Math.abs(amount),
          userId: user.id,
          categoryId: amount > 0 ? categoryInId : categoryOutId,
          currencyId: currency.id,
          type,
          date: new Date(),
          meta: JSON.stringify(statement),
          isImported: true,
        } as Partial<Transaction>;

        if (type === TransactionType.income) {
          trxData.destinationWalletId = walletData.id;
        }

        if (type === TransactionType.outcome) {
          trxData.sourceWalletId = walletData.id;
        }

        await Transaction.query().insert(trxData);
      }
    }
  }

  protected getClientInfo(id: string, token: string): Promise<GetClientInfoResponse | undefined> {
    const data = `<oper>cmt</oper><wait>0</wait><test>0</test><payment id=""></payment>`;
    return this.query('balance', this.getBody(data, id, token));
  }

  /**
   * @param id
   * @param token
   * @param from 07.08.2020
   * @param to 07.08.2020
   */
  protected getStatements(
    id: string,
    token: string,
    from: string,
    to: string,
  ): Promise<GetStatementsResponse> {
    const data = `<oper>cmt</oper><wait>0</wait><test>0</test><payment id=""><prop name="sd" value="${from}" /><prop name="ed" value="${to}" /></payment>`;
    return this.query('https://api.privatbank.ua/p24api/rest_fiz', this.getBody(data, id, token));
  }

  private sha1(data) {
    return createHash('sha1').update(data).digest('hex');
  }

  private md5(data) {
    return createHash('md5').update(data).digest('hex');
  }

  private getBody(data: string, id: string, token: string) {
    const signature = this.sha1(this.md5(data + token));
    return `<?xml version="1.0" encoding="UTF-8"?>
    <request version="1.0">
    <merchant>
        <id>${id}</id>
        <signature>${signature}</signature>
    </merchant>
    <data>${data}</data>
</request>`;
  }

  private async query(url: string, body: string) {
    const response = await this.client.post(url, body, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });

    try {
      Logger.debug(response.data, 'Privat24 privider');
      const json = JSON.parse(toJson(response.data));
      return json?.response?.data;
    } catch (e) {
      return;
    }
  }
}
