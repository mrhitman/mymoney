import { Injectable } from '@nestjs/common';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { v4 as uuid } from 'uuid';
import Transaction from 'src/database/models/transaction.model';

@Injectable()
export class WalletsService {
  public async getAll(user: User) {
    return Wallet.query().where({ userId: user.id });
  }

  public async getWallet(id: string) {
    return Wallet.query().findById(id);
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
