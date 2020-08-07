import { Module } from '@nestjs/common';
import { BankTaskService } from './bank-task.service';
import { BanksResolver } from './bank.resolver';
import { MonobankProvider } from './monobank.provider';
import { Privat24Provider } from './privat24.provider';

@Module({
  providers: [MonobankProvider, Privat24Provider, BankTaskService, BanksResolver],
})
export class BanksModule { }
