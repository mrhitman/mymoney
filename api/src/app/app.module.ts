import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { BanksModule } from 'src/banks/banks.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { BudgetsModule } from '../budgets/budgets.module';
import { CategoriesModule } from '../categories/categories.module';
import { CurrenciesModule } from '../currencies/currencies.module';
import { Fixer } from '../fixer';
import { GoalsModule } from '../goals/goals.module';
import { StatisticsModule } from '../statistics/statistics.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { UsersModule } from '../users/users.module';
import { ApolloComplexityPlugin } from '../utils/apollo-complexity-plugin';
import { WalletsModule } from '../wallets/wallets.module';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { LoggerMiddleware } from './logger.middleware';
import { TaskService } from './task.service';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    WalletsModule,
    CategoriesModule,
    BudgetsModule,
    GoalsModule,
    TransactionsModule,
    CurrenciesModule,
    AuthModule,
    StatisticsModule,
    BanksModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      plugins: [new ApolloComplexityPlugin(20)],
      autoSchemaFile: 'schema.gql',
    }),
  ],
  controllers: [AppController],
  providers: [Fixer, TaskService, LocalStrategy, AppResolver],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
