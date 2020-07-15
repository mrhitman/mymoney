import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { groupBy, reduce, sumBy, upperFirst } from 'lodash';
import { DateTime } from 'luxon';
import moment from 'moment';
import Objection, {
  OrderByDirection,
  RelationExpression,
  transaction,
} from 'objection';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import { v4 as uuid } from 'uuid';
import Wallet from '../database/models/wallet.model';
import { WalletsService } from '../wallets/wallets.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

export type Interval = 'day' | 'week' | 'month' | 'year';

interface QueryParams {
  relation?: RelationExpression<any>;
  limit?: number;
  offset?: number;
  sortDirection?: OrderByDirection;
  sortBy?: string;
  start?: number;
  end?: number;
}

@Injectable()
export class TransactionsService {
  constructor(protected walletService: WalletsService) {}

  public async getAll(user: User, params: QueryParams = {}) {
    const query = Transaction.query().where({ userId: user.id });

    if (params.relation) {
      query.withGraphFetched(params.relation);
    }

    if (params.start) {
      query.where('date', '>=', moment.unix(params.start).toDate());
    }

    if (params.end) {
      query.where('date', '<=', moment.unix(params.end).toDate());
    }

    const count = await query.clone().clearSelect().count();

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

  public async getStatistic(
    user: User,
    params: QueryParams & { interval: Interval } = { interval: 'month' },
  ) {
    const items = await this.getAll(user, params);

    const data = items.items
      .map((trx, i, transactions) => {
        const amount = transactions
          .filter((t) => moment(trx.date).unix() >= moment(t.date).unix())
          .reduce((s, t) => {
            return (
              s +
              (t.type === 'outcome' ? -1 * Number(t.amount) : Number(t.amount))
            );
          }, 0);

        return {
          date: trx.date,
          amount,
        };
      })
      .sort((a, b) => moment(a.date).unix() - moment(b.date).unix());

    const grouped = this.groupStatistic(data, params.interval);
    return reduce(
      grouped,
      (acc, group, interval) => {
        return { ...acc, [interval]: sumBy(group, 'amount') };
      },
      {},
    );
  }

  protected groupStatistic(
    items: Array<{ date: moment.MomentInput }>,
    interval: Interval,
  ) {
    switch (interval) {
      case 'day':
        return groupBy(items, (item) =>
          moment(item.date).startOf('day').unix(),
        );
      case 'week':
        return groupBy(items, (item) =>
          moment(item.date).startOf('week').unix(),
        );
      case 'month':
        return groupBy(items, (item) =>
          moment(item.date).startOf('month').unix(),
        );
      case 'year':
        return groupBy(items, (item) =>
          moment(item.date).startOf('year').unix(),
        );
      default:
        return groupBy(items, (item) =>
          moment(item.date).startOf('month').unix(),
        );
    }
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

      const wallet = await this[`add${upperFirst(trx.type)}Trx`](
        user,
        trx,
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
    user: User,
    trx: Transaction,
    dbTrx?: Objection.TransactionOrKnex,
  ) {
    const wallet = await this.walletService.getOne(
      user,
      trx.destinationWalletId,
    );
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
    user: User,
    trx: Transaction,
    dbTrx?: Objection.TransactionOrKnex,
  ) {
    const wallet = await this.walletService.getOne(user, trx.sourceWalletId);
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
    user: User,
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
