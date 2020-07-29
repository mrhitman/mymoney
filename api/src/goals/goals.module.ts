import { Module } from '@nestjs/common';
import { DataLoader } from 'src/dataloader';
import { WalletsService } from 'src/wallets/wallets.service';
import { GoalsResolver } from './goals.resolver';
import { GoalsService } from './goals.service';
import { TransactionsService } from 'src/transactions/transactions.service';

@Module({
  providers: [
    GoalsService,
    WalletsService,
    TransactionsService,
    GoalsResolver,
    DataLoader,
  ],
})
export class GoalsModule { }
