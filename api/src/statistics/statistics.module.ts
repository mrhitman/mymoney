import { Module } from '@nestjs/common';
import { TransactionsService } from 'src/transactions/transactions.service';
import { WalletsService } from 'src/wallets/wallets.service';
import { StatisticsResolver } from './statistics.resolver';
import { StatisticsService } from './statistics.service';

@Module({
  providers: [
    StatisticsResolver,
    StatisticsService,
    TransactionsService,
    WalletsService,
  ],
})
export class StatisticsModule {}
