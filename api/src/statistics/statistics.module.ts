import { Module, CacheModule } from '@nestjs/common';
import { TransactionsService } from 'src/transactions/transactions.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';
import { Fixer } from 'src/fixer';
import redisStore from 'cache-manager-redis-store';
import { DatabaseModule } from 'src/database/database.module';
import { CurrenciesService } from 'src/currencies/currencies.service';

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
    StatisticsService,
    TransactionsService,
    WalletsService,
    CurrenciesService,
    Fixer
  ],
})
export class StatisticsModule { }
