import { Injectable } from '@nestjs/common';
import Transaction from 'src/database/models/transaction.model';
import User from 'src/database/models/user.model';

@Injectable()
export class TransactionsService {
  public async getAll(user: User) {
    return Transaction.query().where({ user_id: user.id });
  }
}
