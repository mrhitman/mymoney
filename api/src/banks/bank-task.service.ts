import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MonobankProvider } from './monobank.provider';
import BankConnector, {
  BankConnectorType,
} from 'src/database/models/bank-connector.model';
import { raw } from 'objection';
import { Privat24Provider } from './privat24.provider';

@Injectable()
export class BankTaskService {
  constructor(
    protected readonly mono: MonobankProvider,
    protected readonly privat24: Privat24Provider,
  ) { }

  /**
   * Every 10 minutes
   */
  @Cron('*/10 * * * *')
  public async pushRepeatableTransactions() {
    const connectorsMono = await BankConnector.query()
      .withGraphFetched('[user]')
      .where({
        enabled: true,
      })
      .where(subquery =>
        subquery
          .where('syncAt', '<', raw("now() - bank_connectors.interval * interval '1 second'"))
          .orWhereNull('syncAt')
      );

    for (let connector of connectorsMono) {
      switch (connector.type) {
        case BankConnectorType.MONOBANK:
          await this.mono.import(connector.user, connector.meta.token);
          break;
        case BankConnectorType.PRIVAT24:
          await this.privat24.import(
            connector.user,
            connector.meta.merchant_id,
            connector.meta.password,
          );
          break;
      }
      connector.$query().update({
        syncAt: new Date(),
      });
    }
  }
}
