import { Injectable, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { bindFilters, QueryParams } from 'src/utils';
import { v4 as uuid } from 'uuid';
import { WalletCreate } from './input/wallet-create';
import { WalletUpdate } from './input/wallet-update';

@Injectable()
export class WalletsService {
  public async getAll(user: User, params: QueryParams = {}) {
    const query = Wallet.query().where({ userId: user.id });
    bindFilters(query, params);
    return query;
  }

  public async performOperation(wallet: Wallet, trx: Transaction) {
    const pocket = wallet.pockets.find(
      (p) => p.currencyId === trx.currencyId,
    ) || {
      id: uuid(),
      currencyId: trx.currencyId,
      amount: 0,
    };
    pocket.amount += trx.amount * (trx.type === 'income' ? 1 : -1);
  }

  public async findOne(user: User, id: string) {
    const wallet = await Wallet.query().findOne({ id, userId: user.id });

    if (!wallet) {
      throw new NotFoundException();
    }

    return wallet;
  }

  public async create(user: User, data: WalletCreate) {
    const wallet = await Wallet.query().insert({
      ...data,
      id: uuid(),
      userId: user.id,
      syncAt: DateTime.local().toJSDate(),
      ...(data.createdAt && {
        createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
      }),
    });
    return wallet;
  }

  public async update(user: User, data: WalletUpdate) {
    const wallet = await this.findOne(user, data.id);
    await wallet.$query().update({
      ...data,
      ...(data.updatedAt && {
        updatedAt: DateTime.fromSeconds(data.updatedAt).toJSDate(),
      }),
    });
    return wallet;
  }

  public async delete(user: User, id: string) {
    const wallet = await this.findOne(user, id);
    await wallet.$query().delete();
    return wallet;
  }
}
