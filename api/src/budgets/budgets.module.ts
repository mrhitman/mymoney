import { Module } from '@nestjs/common';
import { DataLoader } from 'src/dataloader';
import { BudgetsResolver } from './budgets.resolver';
import { BudgetsService } from './budgets.service';
import { CategoryResolver } from './category.resolver';
import { BudgetsTaskService } from './budgets-task.service';

@Module({
  providers: [BudgetsService, BudgetsTaskService, BudgetsResolver, CategoryResolver, DataLoader],
  exports: [BudgetsService],
})
export class BudgetsModule {}
