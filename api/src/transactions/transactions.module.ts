import { Module } from '@nestjs/common';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { DataLoader } from 'src/dataloader';
import { WalletsService } from 'src/wallets/wallets.service';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    CurrenciesModule,
  ],
  providers: [
    TransactionsResolver,
    TransactionsService,
    WalletsService,
    DataLoader,
  ],
})
export class TransactionsModule { }
