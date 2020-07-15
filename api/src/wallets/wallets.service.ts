import { Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';
import { DateTime } from 'luxon';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { bindFilters, QueryParams } from 'src/utils';
import CreateWalletDto from 'src/wallets/dto/create-wallet.dto';
import { v4 as uuid } from 'uuid';

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

  public async findOne(id: string, user: User) {
    const wallet = await Wallet.query().findOne({ id, userId: user.id });

    if (!wallet) {
      throw new NotFoundException();
    }

    return wallet;
  }

  public async create(data: CreateWalletDto, user: User) {
    return Wallet.query().insert({
      ...omit(data, [
        'allow_negative_balance',
        'use_in_analytics',
        'use_in_balance',
        'tags',
      ]),
      userId: user.id,
      syncAt: DateTime.local().toJSDate(),
      ...(data.createdAt && {
        createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
      }),
    });
  }

  public async update(data: any, user: User) {
    const wallet = await this.findOne(data.id, user);

    await wallet.$query().update({
      ...data,
      updatedAt: DateTime.fromSeconds(data.updatedAt).toJSDate(),
    });
  }

  public async delete(id: string, user: User) {
    const wallet = await this.findOne(id, user);

    return wallet.$query().delete();
  }
}
