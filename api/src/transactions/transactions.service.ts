import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { dataByCategory, dataByPeriod, Interval } from 'common';
import { DateTime } from 'luxon';
import { transaction, TransactionOrKnex } from 'objection';
import Transaction, { categoryInId, categoryOutId, categoryTransferId } from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import { v4 as uuid } from 'uuid';
import Category from '../database/models/category.model';
import Wallet from '../database/models/wallet.model';
import { WalletsService } from '../wallets/wallets.service';
import { TransactionCreate } from './input/transaction-create';
import { TransactionUpdate } from './input/transaction-update';
import { TransactionType } from './transaction-type';

@Injectable()
export class TransactionsService {
  constructor(protected walletService: WalletsService) { }

  public async getAll(user: User) {
    const query = Transaction.query().where({ userId: user.id });
    const items = await query;
    return { items };
  }

  public async getOne(user: User, id: string) {
    const trx = await Transaction.query()
      .findById(id)
      .where({ userId: user.id });

    if (!trx) {
      throw new BadRequestException('No such category');
    }

    return trx;
  }

  public async getStatisticByPeriod(
    user: User,
    params: { interval: Interval } = { interval: 'month' },
  ) {
    const items = await this.getAll(user);
    return dataByPeriod(items.items, params.interval);
  }

  public async getStatisticByCategory(user: User) {
    const items = await this.getAll(user);
    const data = dataByCategory(items.items, true);
    const categoryIds = data.map((d) => d.categoryId);
    const categories = await Category.query().whereIn('id', categoryIds);
    return data.map((d) => ({
      ...d,
      category: categories.find((c) => c.id === d.categoryId),
    }));
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

  public async create(user: User, data: TransactionCreate) {
    const dbTrx = await transaction.start(Transaction);
    try {
      const trx = await Transaction.query(dbTrx).insert({
        ...data,
        id: uuid(),
        userId: user.id,
        date: DateTime.fromSeconds(data.date).toJSDate(),
        syncAt: DateTime.local().toJSDate(),
        ...(data.createdAt && {
          createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
        }),
      });

      const wallet = await this[`add_${trx.type}_Trx`](user, trx, dbTrx);
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

  public async update(user: User, data: TransactionUpdate) {
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

  public async add_income_Trx(
    user: User,
    trx: Transaction,
    dbTrx?: TransactionOrKnex,
  ) {
    const wallet = await this.walletService.findOne(
      user,
      trx.destinationWalletId,
    );
    const pocket = this.getOrCreatePocket(wallet, trx);
    pocket.amount += trx.amount;

    await wallet
      .$query(dbTrx)
      .update({
        pockets: [
          ...wallet.pockets.filter((p) => p.currencyId !== pocket.currencyId),
          pocket,
        ],
      })
      .execute();

    return wallet;
  }

  public async add_outcome_Trx(
    user: User,
    trx: Transaction,
    dbTrx?: TransactionOrKnex,
  ) {
    const wallet = await this.walletService.findOne(user, trx.sourceWalletId);
    const pocket = this.getOrCreatePocket(wallet, trx);
    pocket.amount -= trx.amount;

    await wallet
      .$query(dbTrx)
      .update({
        pockets: [
          ...wallet.pockets.filter((p) => p.currencyId !== pocket.currencyId),
          pocket,
        ],
      })
      .execute();

    return wallet;
  }

  public async add_transfer_Trx(
    user: User,
    trx: Transaction,
    dbTrx?: TransactionOrKnex,
  ) {
    await trx.$query().update({ categoryId: categoryTransferId });
    const trxIn = await Transaction.query(dbTrx).insert({
      id: uuid(),
      userId: user.id,
      type: TransactionType.income,
      categoryId: categoryInId,
      amount: trx.amount,
      date: trx.date,
      syncAt: trx.syncAt,
      createdAt: trx.createdAt
    });
    const trxOut = await Transaction.query(dbTrx).insert({
      id: uuid(),
      userId: user.id,
      type: TransactionType.outcome,
      categoryId: categoryOutId,
      amount: trx.amount,
      date: trx.date,
      syncAt: trx.syncAt,
      createdAt: trx.createdAt
    });
    await this.add_income_Trx(user, trxIn, dbTrx);
    await this.add_outcome_Trx(user, trxOut, dbTrx);
    return;
  }

  private getOrCreatePocket(wallet: Wallet, trx: Transaction) {
    return (
      wallet.pockets.find((p) => p.currencyId === trx.currencyId) || {
        currencyId: trx.currencyId,
        amount: 0,
      }
    );
  }
}
