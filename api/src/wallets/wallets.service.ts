import { Injectable, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { v4 as uuid } from 'uuid';
import { WalletCreate } from './input/wallet-create';
import { WalletUpdate } from './input/wallet-update';

@Injectable()
export class WalletsService {
  public async getAll(user: User) {
    const query = Wallet.query().where({ userId: user.id }).whereNot({
      type: 'goal',
    });
    return query;
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
      type: 'credit',
      pockets: [],
      tags: [],
      id: uuid(),
      allowNegativeBalance: true,
      ...data,
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
