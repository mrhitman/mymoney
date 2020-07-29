import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { WalletsService } from 'src/wallets/wallets.service';
import { StatisticsService } from './statistics.service';

describe('StatisticsService', () => {
  let service: StatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CurrenciesModule],
      providers: [StatisticsService, WalletsService],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
