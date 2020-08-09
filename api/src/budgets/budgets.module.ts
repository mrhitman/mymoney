import { Module } from '@nestjs/common';
import { BudgetsResolver } from './budgets.resolver';
import { BudgetsService } from './budgets.service';

@Module({
  providers: [BudgetsService, BudgetsResolver],
})
export class BudgetsModule { }
