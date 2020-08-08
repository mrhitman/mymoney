import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MonobankProvider } from './monobank.provider';
import BankConnector, {
  BankConnectorType,
} from 'src/database/models/bank-connector.model';
import { raw } from 'objection';

@Injectable()
export class BankTaskService {
  constructor(protected readonly service: MonobankProvider) {}

  /**
   * Every 5 minutes
   */
  @Cron('*/5 * * * *')
  public async pushRepeatableTransactions() {
    const connectors = await BankConnector.query()
      .withGraphFetched('[user]')
      .where({
        enabled: true,
        type: BankConnectorType.MONOBANK,
      })
      .where(
        'syncAt',
        '<',
        raw("now() - bank_connectors.interval * interval '1 second'"),
      );

    Logger.log('Bank scheduling task updating api', 'Monobank Api');
    for (let connector of connectors) {
      this.service.import(connector.user, connector.meta.token);
    }
  }
}
