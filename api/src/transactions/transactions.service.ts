import { BadRequestException, ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { appendFile } from 'fs';
import { resolve } from 'path';
import { DateTime } from 'luxon';
import { OrderByDirection, transaction, TransactionOrKnex } from 'objection';
import { BudgetsService } from 'src/budgets/budgets.service';
import Transaction, {
  categoryInId,
  categoryOutId,
  categoryTransferId,
} from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';
import { WalletsService } from 'src/wallets/wallets.service';
import { v4 as uuid } from 'uuid';
import { TransactionCreate } from './input/transaction-create';
import { TransactionUpdate } from './input/transaction-update';
import { TransactionType } from './transaction-type';

interface TransactionFilters {
  walletIds?: string[];
  type?: TransactionType;
  from?: number;
  to?: number;
  search?: string;
  order?: OrderByDirection;
  orderBy?: string;
  amountGteFilter?: number;
  amountLteFilter?: number;
  currencyId?: string;
  categoryIds?: string[];
}

@Injectable()
export class TransactionsService {
  constructor(protected walletService: WalletsService, protected budgetService: BudgetsService) { }

  public async export(user: User, filter: TransactionFilters = {}) {
    function write(path: string, data: any) {
      return new Promise((res, rej) => {
        appendFile(path, data, { encoding: 'utf-8' }, (err) => {
          if (err) {
            rej(err);
          } else {
            res(true);
          }
        });
      });
    }
    const query = this.getAll(user, filter);
    const limit = 10;
    let offset = 0;
    let rows: Transaction[] = [];
    const name = `${uuid()}.json`;
    const path = resolve(__dirname, '..', '..', 'static', name);
    await write(path, '[');
    while (true) {
      rows = await query
        .limit(limit)
        .offset(offset)
        .orderBy(filter.orderBy || 'date', filter.order || 'desc');

      if (!rows.length) {
        break;
      }

      await write(
        path,
        (offset ? ',' : '') + JSON.stringify(rows.map((row) => row.toJSON())).slice(1, -1),
      );
      offset += limit;
    }
    await write(path, ']');

    return `/${name}`;
  }

  public getAll(user: User, filter: TransactionFilters = {}) {
    const query = Transaction.query().where({ userId: user.id });

    if (filter.walletIds) {
      query.where((subquery) =>
        subquery
          .whereIn('sourceWalletId', filter.walletIds)
          .orWhereIn('destinationWalletId', filter.walletIds),
      );
    }

    if (filter.currencyId) {
      query.where({ currencyId: filter.currencyId });
    }

    if (filter.categoryIds) {
      query.whereIn('categoryId', filter.categoryIds);
    }

    if (filter.type) {
      query.where({ type: filter.type });
    }

    if (filter.from) {
      query.where('date', '>=', DateTime.fromSeconds(filter.from).toString());
    }

    if (filter.search) {
      query.where((builder) =>
        builder.where({ id: filter.search }).orWhere('description', 'like', `%${filter.search}%`),
      );
    }

    if (filter.amountGteFilter) {
      query.where('amount', '>=', filter.amountGteFilter);
    }

    if (filter.amountLteFilter) {
      query.where('amount', '<=', filter.amountLteFilter);
    }

    if (filter.to) {
      query.where('date', '<=', DateTime.fromSeconds(filter.to).toString());
    }

    return query.debug();
  }

  public async getOne(user: User, id: string) {
    const trx = await Transaction.query().findById(id).where({ userId: user.id });

    if (!trx) {
      throw new BadRequestException('No such category');
    }

    return trx;
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

      switch (trx.type) {
        case TransactionType.income:
          await this.addIncomeTrx(user, trx, dbTrx);
          break;
        case TransactionType.outcome:
          await this.addOutcomeTrx(user, trx, dbTrx);
          break;
        case TransactionType.transfer:
          await this.addTransferTrx(user, trx, dbTrx);
          break;
        default:
          throw new BadRequestException(`Invalid trx type:${trx.type}`)
      }

      await dbTrx.commit();

      return trx;
    } catch (e) {
      await dbTrx.rollback();
      Logger.error(e.message);
      throw new BadRequestException(e.message);
    }
  }

  public async update(user: User, data: TransactionUpdate) {
    const trx = await this.getTransaction(data.id, user.id);

    await trx.$query().update({
      ...data,
      date: DateTime.fromSeconds(data.date).toJSDate(),
      updatedAt: DateTime.fromSeconds(data.updatedAt).toJSDate(),
      deletedAt: data.deletedAt ? DateTime.fromSeconds(data.deletedAt).toJSDate() : null,
    });

    return trx;
  }

  public async delete(id: string, user: User) {
    const trx = await this.getTransaction(id, user.id);

    return trx.$query().delete();
  }

  private async addIncomeTrx(user: User, trx: Transaction, dbTrx?: TransactionOrKnex) {
    console.log(trx.destinationWalletId)
    const wallet = await this.walletService.findOne(user, trx.destinationWalletId);
    console.log(wallet)
    const pocket = this.getOrCreatePocket(wallet, trx);
    console.log(pocket)
    pocket.amount += trx.amount;

    await wallet
      .$query(dbTrx)
      .update({
        pockets: [...wallet.pockets.filter((p) => p.currencyId !== pocket.currencyId), pocket],
      })
      .execute();

    await this.budgetService.income(user, trx);
    return wallet;
  }

  private async addOutcomeTrx(user: User, trx: Transaction, dbTrx?: TransactionOrKnex) {
    const wallet = await this.walletService.findOne(user, trx.sourceWalletId);
    const pocket = this.getOrCreatePocket(wallet, trx);
    pocket.amount -= trx.amount;

    await wallet
      .$query(dbTrx)
      .update({
        pockets: [...wallet.pockets.filter((p) => p.currencyId !== pocket.currencyId), pocket],
      })
      .execute();

    await this.budgetService.outcome(user, trx);
    return wallet;
  }

  private async addTransferTrx(user: User, trx: Transaction, dbTrx?: TransactionOrKnex) {
    await trx.$query().update({ categoryId: categoryTransferId });
    const trxIn = await Transaction.query(dbTrx).insert({
      id: uuid(),
      userId: user.id,
      type: TransactionType.income,
      currencyId: trx.currencyId,
      destinationWalletId: trx.destinationWalletId,
      categoryId: categoryInId,
      amount: trx.amount,
      date: trx.date,
      syncAt: trx.syncAt,
      createdAt: trx.createdAt,
    });
    const trxOut = await Transaction.query(dbTrx).insert({
      id: uuid(),
      userId: user.id,
      type: TransactionType.outcome,
      currencyId: trx.currencyId,
      sourceWalletId: trx.sourceWalletId,
      categoryId: categoryOutId,
      amount: trx.amount,
      date: trx.date,
      syncAt: trx.syncAt,
      createdAt: trx.createdAt,
    });
    await this.addIncomeTrx(user, trxIn, dbTrx);
    await this.addOutcomeTrx(user, trxOut, dbTrx);
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
