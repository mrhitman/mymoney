import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { DatabaseModule } from 'src/database/database.module';
import { DataLoader } from 'src/dataloader';
import { Fixer } from 'src/fixer';
import { WalletsService } from 'src/wallets/wallets.service';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';
import { StatisticsByCurrencyResolver } from './statistics-by-currency.resolver';

@Module({
  imports: [
    DatabaseModule,
    CacheModule.register({
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
  ],
  providers: [
    StatisticsResolver,
    StatisticsByCurrencyResolver,
    StatisticsService,
    WalletsService,
    CurrenciesService,
    Fixer,
    DataLoader,
  ],
})
export class StatisticsModule { }
