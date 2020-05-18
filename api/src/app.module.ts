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
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    WalletsModule,
    CategoriesModule,
    BudgetsModule,
    GoalsModule,
    TransactionsModule,
    CurrenciesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [Fixer],
})
export class AppModule {}
