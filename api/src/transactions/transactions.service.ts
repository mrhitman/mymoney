import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import { v4 as uuid } from 'uuid';
import { upperFirst } from 'lodash';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import Wallet from '../database/models/wallet.model';
import { WalletsService } from '../wallets/wallets.service';

@Injectable()
export class TransactionsService {
  constructor(protected walletService: WalletsService) {}

  public async getAll(user: User) {
    return Transaction.query().where({ userId: user.id });
  }

  public async getTransaction(id: string, userId: number) {
    const trx = await Transaction.query().findById(id);

    if (!trx) {
      throw new BadRequestException('No such category');
    }

    if (trx.userId !== userId) {
      throw new ForbiddenException('You are not access to this item');
    }

    return trx;
  }

  public async create(data: CreateTransactionDto, user: User) {
    const trx = await Transaction.query().insert({
      ...data,
      id: uuid(),
      userId: user.id,
      date: DateTime.fromSeconds(data.date).toJSDate(),
      createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
      syncAt: DateTime.local().toJSDate(),
    });

    this[`add${upperFirst(trx.type)}Trx`](trx);

    return trx;
  }

  protected async addIncomeTrx(trx: Transaction) {
    const wallet = await this.walletService.getWallet(trx.sourceWalletId);
    this.walletService.performOperation(wallet, trx);
    await wallet.$query().update().execute();
  }

  protected async addOutcomeTrx(trx: Transaction) {
    const wallet = await this.walletService.getWallet(trx.sourceWalletId);
    this.walletService.performOperation(wallet, trx);
    await wallet.$query().update().execute();
  }

  protected async addTransferTrx(trx: Transaction) {}

  public async update(data: UpdateTransactionDto, user: User) {
    const trx = await this.getTransaction(data.id, user.id);

    await trx.$query().update({
      ...data,
      date: DateTime.fromSeconds(data.date).toJSDate(),
      updatedAt: DateTime.fromSeconds(data.updatedAt).toJSDate(),
      deletedAt: data.deletedAt
        ? DateTime.fromSeconds(data.deletedAt).toJSDate()
        : null,
    });

    return trx;
  }

  public async delete(id: string, user: User) {
    const trx = await this.getTransaction(id, user.id);

    return trx.$query().delete();
  }
}
