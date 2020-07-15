import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { dataByCategory, dataByPeriod, Interval } from 'common';
import { upperFirst } from 'lodash';
import { DateTime } from 'luxon';
import Objection, { transaction } from 'objection';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import { v4 as uuid } from 'uuid';
import Category from '../database/models/category.model';
import Wallet from '../database/models/wallet.model';
import { bindFilters, QueryParams } from '../utils';
import { WalletsService } from '../wallets/wallets.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(protected walletService: WalletsService) {}

  public async getAll(user: User, params: QueryParams = {}) {
    const query = Transaction.query().where({ userId: user.id });
    bindFilters(query, params);

    if (params.start && !isNaN(params.start)) {
      query.where('date', '>=', DateTime.fromSeconds(+params.start).toJSDate());
    }

    if (params.end && !isNaN(params.end)) {
      query.where('date', '<=', DateTime.fromSeconds(+params.end).toJSDate());
    }

    const count = await query.clone().clearSelect().clearWithGraph().count();
    params.limit && query.limit(params.limit);
    params.offset && query.offset(params.offset);
    query.orderBy(
      params.sortBy || 'created_at',
      params.sortDirection || 'DESC',
    );

    const items = await query;

    return {
      items,
      count: Number((count[0] as any).count),
    };
  }

  public async getStatisticByPeriod(
    user: User,
    params: QueryParams & { interval: Interval } = { interval: 'month' },
  ) {
    const items = await this.getAll(user, params);
    return dataByPeriod(items.items, params.interval);
  }

  public async getStatisticByCategory(user: User, params: QueryParams) {
    const items = await this.getAll(user, params);
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

  public async create(data: CreateTransactionDto, user: User) {
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

      const wallet = await this[`add${upperFirst(trx.type)}Trx`](
        trx,
        user,
        dbTrx,
      );
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
    user: User,
    dbTrx?: Objection.TransactionOrKnex,
  ) {
    const wallet = await this.walletService.findOne(
      user,
      trx.destinationWalletId,
    );
    const pocket = this.getPocket(wallet, trx);
    pocket.amount += trx.amount;

    await wallet
      .$query(dbTrx)
      .update({
        pockets: [
          ...wallet.pockets.filter((p) => p.currencyId !== pocket.currencyId),
          pocket,
        ],
      })
      .debug()
      .execute();

    return wallet;
  }

  protected async addOutcomeTrx(
    trx: Transaction,
    user: User,
    dbTrx?: Objection.TransactionOrKnex,
  ) {
    const wallet = await this.walletService.findOne(user, trx.sourceWalletId);
    const pocket = this.getPocket(wallet, trx);
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

  protected async addTransferTrx(
    trx: Transaction,
    user: User,
    dbTrx?: Objection.TransactionOrKnex,
  ) {
    return;
  }

  private getPocket(wallet: Wallet, trx: Transaction) {
    return (
      wallet.pockets.find((p) => p.currencyId === trx.currencyId) || {
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
