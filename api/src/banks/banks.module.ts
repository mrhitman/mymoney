import { Module } from '@nestjs/common';
import { BankTaskService } from './bank-task.service';
import { BanksResolver } from './bank.resolver';
import { MonobankController } from './monobank.controller';
import { MonobankProvider } from './monobank.provider';

@Module({
  controllers: [MonobankController],
  providers: [MonobankProvider, BankTaskService, BanksResolver],
})
export class BanksModule { }
