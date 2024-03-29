import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';
import { config } from 'src/config';
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
      url: config.redis.url,
    }),
  ],
  providers: [WalletsResolver, PocketResolver, CurrencyRateResolver, WalletsService, DataLoader],
  exports: [WalletsService],
})
export class WalletsModule {}
