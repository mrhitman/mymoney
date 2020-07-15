import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';

@Module({
  providers: [BudgetsService],
})
export class BudgetsModule {}
