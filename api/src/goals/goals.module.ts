import { Module } from '@nestjs/common';
import { DataLoader } from 'src/dataloader';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { WalletsModule } from 'src/wallets/wallets.module';
import { GoalsResolver } from './goals.resolver';
import { GoalsService } from './goals.service';

@Module({
  imports: [TransactionsModule, WalletsModule],
  providers: [GoalsService, GoalsResolver, DataLoader],
})
export class GoalsModule {}
