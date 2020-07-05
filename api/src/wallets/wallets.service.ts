import { Injectable, NotFoundException } from '@nestjs/common';
import { DateTime } from 'luxon';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { bindFilters, QueryParams } from 'src/utils';
import CreateWalletDto from 'src/wallets/dto/create-wallet.dto';
import { v4 as uuid } from 'uuid';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Injectable()
export class WalletsService {
  public async getAll(user: User, params: QueryParams = {}) {
    const query = Wallet.query().where({ userId: user.id });
    bindFilters(query, params);
    return query;
  }

  protected async performOperation(wallet: Wallet, trx: Transaction) {
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
      ...data,
      userId: user.id,
      createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
      syncAt: DateTime.local().toJSDate(),
    });
  }

  public async update(data: UpdateWalletDto, user: User) {
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
