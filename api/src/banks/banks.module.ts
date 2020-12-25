import { Module } from '@nestjs/common';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { BanksTaskService } from './banks-task.service';
import { BanksResolver } from './banks.resolver';
import { MonobankProvider } from './monobank.provider';
import { Privat24Provider } from './privat24.provider';

@Module({
  imports: [StatisticsModule, TransactionsModule],
  providers: [MonobankProvider, Privat24Provider, BanksTaskService, BanksResolver],
})
export class BanksModule {}
