import { Module } from '@nestjs/common';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { DataLoader } from 'src/dataloader';
import { WalletsService } from 'src/wallets/wallets.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { BudgetsService } from 'src/budgets/budgets.service';

@Module({
  imports: [
    CurrenciesModule,
  ],
  providers: [
    TransactionsResolver,
    TransactionsService,
    WalletsService,
    BudgetsService,
    DataLoader,
  ],
})
export class TransactionsModule { }
