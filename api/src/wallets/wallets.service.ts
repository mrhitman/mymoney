import { Injectable } from '@nestjs/common';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { v4 as uuid } from 'uuid';
import Transaction from 'src/database/models/transaction.model';
import { DateTime } from 'luxon';
import { WalletCreateInput } from './dto/wallet-create-input';

@Injectable()
export class WalletsService {
  public async getAll(user: User, params?: { eager?: string }) {
    const query = Wallet.query().where({ userId: user.id });

    if (params && params.eager) {
      query.eager(params.eager);
    }

    return query;
  }

  public async getOne(user: User, id: string) {
    return Wallet.query().where({ userId: user.id }).findById(id);
  }

  public async create(user: User, data: WalletCreateInput) {
    const wallet = await Wallet.query().insert({
      id: uuid(),
      name: data.name,
      description: data.description,
      ...(data.createdAt && {
        createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
      }),
      pockets: data.pockets || [],
    });

    return wallet;
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
}
