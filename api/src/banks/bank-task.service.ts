import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import User from 'src/database/models/user.model';
import { MonobankProvider } from './monobank.provider';

@Injectable()
export class BankTaskService {
  constructor(protected readonly service: MonobankProvider) { }

  /**
   * Every hour
   */
  @Cron('0 * * * *')
  public async pushRepeatableTransactions() {
    const users = await User.query();

    Logger.log('Bank scheduling task updating api', 'Monobank Api');
    for (let user of users) {
      await Promise.all(user.connections.filter(c => c.type === 'monobank').map(c => this.service.import(user, c.token)));
    }
  }
}
