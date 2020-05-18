import { CacheModule, Module } from '@nestjs/common';
import redisStore from 'cache-manager-redis-store';
import { DatabaseModule } from 'src/database/database.module';
import { Fixer } from 'src/fixer';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

@Module({
  imports: [
    DatabaseModule,
    CacheModule.register({
      store: redisStore,
      url: process.env.REDIS_URL,
    }),
  ],
  controllers: [CurrenciesController],
  providers: [CurrenciesService, Fixer],
})
export class CurrenciesModule {}
