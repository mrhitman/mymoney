import { Module } from '@nestjs/common';
import { BanksTaskService } from './banks-task.service';
import { BanksResolver } from './banks.resolver';
import { MonobankProvider } from './monobank.provider';
import { Privat24Provider } from './privat24.provider';
import { StatisticsModule } from '../statistics/statistics.module';

@Module({
  imports: [StatisticsModule],
  providers: [MonobankProvider, Privat24Provider, BanksTaskService, BanksResolver],
})
export class BanksModule {}
