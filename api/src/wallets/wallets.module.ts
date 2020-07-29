import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { DataLoader } from 'src/dataloader';
import { CurrencyRateResolver } from './currency-rate.resolver';
import { PocketResolver } from './pocket.resolver';
import { WalletsResolver } from './wallets.resolver';
import { WalletsService } from './wallets.service';

@Module({
  imports: [
    CurrenciesModule,
    CacheModule.register({
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
  ],
  providers: [
    WalletsResolver,
    PocketResolver,
    CurrencyRateResolver,
    WalletsService,
    DataLoader,
  ],
})
export class WalletsModule { }
