import { Module } from '@nestjs/common';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { DataLoader } from 'src/dataloader';
import { WalletsService } from 'src/wallets/wallets.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { BudgetsService } from 'src/budgets/budgets.service';
import { BudgetsModule } from 'src/budgets/budgets.module';

@Module({
  imports: [
    CurrenciesModule,
    BudgetsModule,
  ],
  providers: [
    TransactionsResolver,
    TransactionsService,
    WalletsService,
    BudgetsService,
    DataLoader,
  ],
  exports: [
    WalletsService,
    BudgetsService,
    TransactionsService
  ]
})
export class TransactionsModule { }
