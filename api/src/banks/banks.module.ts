import { Module } from '@nestjs/common';
import { BankTaskService } from './bank-task.service';
import { MonobankController } from './monobank.controller';
import { MonobankProvider } from './monobank.provider';

@Module({
  controllers: [MonobankController],
  providers: [MonobankProvider, BankTaskService],
})
export class BanksModule { }
