import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { CategoriesModule } from './categories/categories.module';
import { BudgetsModule } from './budgets/budgets.module';
import { GoalsModule } from './goals/goals.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AppController } from './app/app.controller';
import { CurrenciesModule } from './currencies/currencies.module';
import { Fixer } from './fixer';

@Module({
  imports: [
    UsersModule,
    WalletsModule,
    CategoriesModule,
    BudgetsModule,
    GoalsModule,
    TransactionsModule,
    CurrenciesModule,
  ],
  controllers: [AppController],
  providers: [Fixer],
})
export class AppModule {}
