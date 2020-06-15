import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { upperFirst } from 'lodash';
import { DateTime } from 'luxon';
import Objection, { RelationExpression, transaction } from 'objection';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import { v4 as uuid } from 'uuid';
import Wallet from '../database/models/wallet.model';
import { WalletsService } from '../wallets/wallets.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(protected walletService: WalletsService) {}

  public async getAll(
    user: User,
    params: { relation?: RelationExpression<any> } = {},
  ) {
    const query = Transaction.query().where({ userId: user.id });

    if (params.relation) {
      query.withGraphFetched(params.relation);
    }

    return query;
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
    const dbTrx = await transaction.start(Transaction);
    try {
      const trx = await Transaction.query(dbTrx).insert({
        ...data,
        id: uuid(),
        userId: user.id,
        date: DateTime.fromSeconds(data.date).toJSDate(),
        createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
        syncAt: DateTime.local().toJSDate(),
      });

      const wallet = await this[`add${upperFirst(trx.type)}Trx`](trx, dbTrx);
      await dbTrx.commit();

      return {
        transaction: trx,
        wallet,
      };
    } catch (e) {
      await dbTrx.rollback();
      throw new BadRequestException(e.message);
    }
  }

  protected async addIncomeTrx(
    trx: Transaction,
    dbTrx?: Objection.TransactionOrKnex,
  ) {
    const wallet = await this.walletService.getWallet(trx.destinationWalletId);
    const pocket = this.getPocket(wallet, trx);
    pocket.amount += trx.amount;

    await wallet
      .$query(dbTrx)
      .update({
        pockets: [...wallet.pockets.filter((p) => p.id !== pocket.id), pocket],
      })
      .debug()
      .execute();

    return wallet;
  }

  protected async addOutcomeTrx(
    trx: Transaction,
    dbTrx?: Objection.TransactionOrKnex,
  ) {
    const wallet = await this.walletService.getWallet(trx.sourceWalletId);
    const pocket = this.getPocket(wallet, trx);
    pocket.amount -= trx.amount;

    await wallet
      .$query(dbTrx)
      .update({
        pockets: [...wallet.pockets.filter((p) => p.id !== pocket.id), pocket],
      })
      .execute();

    return wallet;
  }

  protected async addTransferTrx(
    trx: Transaction,
    dbTrx?: Objection.TransactionOrKnex,
  ) {
    return;
  }

  private getPocket(wallet: Wallet, trx: Transaction) {
    return (
      wallet.pockets.find((p) => p.currencyId === trx.currencyId) || {
        id: uuid(),
        currencyId: trx.currencyId,
        amount: 0,
      }
    );
  }

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
