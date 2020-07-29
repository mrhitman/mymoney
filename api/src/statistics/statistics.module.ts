import { Module } from '@nestjs/common';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { DataLoader } from 'src/dataloader';
import { WalletsService } from 'src/wallets/wallets.service';
import { StatisticsByCurrencyResolver } from './statistics-by-currency.resolver';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    CurrenciesModule
  ],
  providers: [
    StatisticsResolver,
    StatisticsByCurrencyResolver,
    StatisticsService,
    WalletsService,
    DataLoader
  ],
})
export class StatisticsModule { }
