import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import redisStore from 'cache-manager-redis-store';
import { config } from 'dotenv';
import { Fixer } from '../fixer';
import { CurrenciesService } from './currencies.service';

describe('CurrenciesService', () => {
  let service: CurrenciesService;

  beforeAll(() => {
    config();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesService, Fixer],
      imports: [
        CacheModule.register({
          store: redisStore,
          url: process.env.REDIS_URL,
        }),
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
