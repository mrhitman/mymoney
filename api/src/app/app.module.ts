import { Module } from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { AuthModule } from '../auth/auth.module';
import { BudgetsModule } from '../budgets/budgets.module';
import { CategoriesModule } from '../categories/categories.module';
import { CurrenciesModule } from '../currencies/currencies.module';
import { Fixer } from '../fixer';
import { GoalsModule } from '../goals/goals.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { UsersModule } from '../users/users.module';
import { WalletsModule } from '../wallets/wallets.module';
import { AppController } from './app.controller';

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
