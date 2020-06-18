import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from 'src/wallets/wallets.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { Fixer } from '../fixer';
import { CurrenciesService } from '../currencies/currencies.service';

describe('Transactions Controller', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsResolver,
        TransactionsService,
        Fixer,
        CurrenciesService,
        WalletsService,
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
