import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService } from './currencies.service';
import { Fixer } from '../fixer';

describe('CurrenciesService', () => {
  let service: CurrenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesService, Fixer],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
