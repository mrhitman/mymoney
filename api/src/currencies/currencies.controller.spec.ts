import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import redisStore from 'cache-manager-redis-store';
import { DatabaseModule } from 'src/database/database.module';
import { Fixer } from 'src/fixer';
import { CurrenciesController } from './currencies.controller';
import { CurrenciesService } from './currencies.service';

describe('Currencies Controller', () => {
  let controller: CurrenciesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrenciesController],
      imports: [
        DatabaseModule,
        CacheModule.register({
          store: redisStore,
          url: process.env.REDIS_URL,
        }),
      ],
      providers: [CurrenciesService, Fixer],
    }).compile();

    controller = module.get<CurrenciesController>(CurrenciesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
