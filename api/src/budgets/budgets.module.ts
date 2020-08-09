import { Module } from '@nestjs/common';
import { DataLoader } from 'src/dataloader';
import { BudgetsResolver } from './budgets.resolver';
import { BudgetsService } from './budgets.service';
import { CategoryResolver } from './category.resolver';

@Module({
  providers: [BudgetsService, BudgetsResolver, CategoryResolver, DataLoader],
})
export class BudgetsModule { }
