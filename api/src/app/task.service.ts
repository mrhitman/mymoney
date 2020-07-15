import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Transaction from 'src/database/models/transaction.model';

@Injectable()
export class TaskService {
  @Cron('0 * * * * *')
  public pullAndResolveRepeatableTransactions() {
    console.log('Called when the current second every 1 minute ' + new Date());
  }

  @Cron('0 */5 * * * *')
  public async pushRepeatableTransactions() {
    const transactions = await Transaction.query().where({
      isTemplate: true,
      isAutoGenerated: false,
    });

    console.log(
      'Called when the current second every 5 minute ' + new Date(),
      transactions,
    );
  }
}