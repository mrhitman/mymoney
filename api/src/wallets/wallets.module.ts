import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { DatabaseModule } from 'src/database/database.module';
import { Fixer } from 'src/fixer';
import { CurrencyRateResolver } from './currency-rate.resolver';
import { PocketResolver } from './pocket.resolver';
import { WalletsResolver } from './wallets.resolver';
import { WalletsService } from './wallets.service';

@Module({
  imports: [
    DatabaseModule,
    CacheModule.register({
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
  ],
  providers: [
    WalletsResolver,
    PocketResolver,
    Fixer,
    CurrenciesService,
    CurrencyRateResolver,
    WalletsService,
  ],
})
export class WalletsModule {}
