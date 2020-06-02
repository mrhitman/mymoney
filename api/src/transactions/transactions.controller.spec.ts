import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from 'src/wallets/wallets.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

describe('Transactions Controller', () => {
  let controller: TransactionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [TransactionsService, WalletsService],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
