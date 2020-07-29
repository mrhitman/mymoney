import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import redisStore from 'cache-manager-redis-store';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { WalletsService } from 'src/wallets/wallets.service';
import { TransactionsService } from './transactions.service';

describe('TransactionsService', () => {
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CurrenciesModule,
      ],
      providers: [TransactionsService, WalletsService],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
