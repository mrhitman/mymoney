import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionsService {
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
    await Transaction.query().insert({
      ...data,
      userId: user.id,
      date: DateTime.fromMillis(data.date).toJSDate(),
      createdAt: DateTime.fromMillis(data.createdAt).toJSDate(),
      syncAt: DateTime.local().toJSDate(),
    });
  }

  public async update(data: UpdateTransactionDto, user: User) {
    const trx = await this.getTransaction(data.id, user.id);

    await trx.$query().update({
      ...data,
      date: DateTime.fromMillis(data.date).toJSDate(),
      updatedAt: DateTime.fromMillis(data.updatedAt).toJSDate(),
      deletedAt: data.deletedAt
        ? DateTime.fromMillis(data.deletedAt).toJSDate()
        : null,
    });
  }

  public async delete(id: string, user: User) {
    const trx = await this.getTransaction(id, user.id);

    return trx.$query().delete();
  }
}
