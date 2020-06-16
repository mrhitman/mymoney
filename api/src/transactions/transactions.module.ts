import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';
import { DatabaseModule } from 'src/database/database.module';
import { CurrenciesService } from '../currencies/currencies.service';
import { Fixer } from '../fixer';
import { WalletsService } from '../wallets/wallets.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    DatabaseModule,
    CacheModule.register({
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionsResolver,
    TransactionsService,
    Fixer,
    CurrenciesService,
    WalletsService,
  ],
})
export class TransactionsModule {}
