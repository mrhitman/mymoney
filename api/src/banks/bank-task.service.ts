import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MonobankProvider } from './monobank.provider';
import BankConnector, { BankConnectorType } from 'src/database/models/bank-connector.model';

@Injectable()
export class BankTaskService {
  constructor(protected readonly service: MonobankProvider) { }

  /**
   * Every hour
   */
  @Cron('0 * * * *')
  public async pushRepeatableTransactions() {
    const connectors = await BankConnector.query().withGraphFetched('[user]').where({
      enabled: true,
      type: BankConnectorType.MONOBANK
    })

    Logger.log('Bank scheduling task updating api', 'Monobank Api');
    for (let connector of connectors) {
      this.service.import(connector.user, connector.meta.token)
    }
  }
}
