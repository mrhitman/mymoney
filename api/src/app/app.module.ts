import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { BanksModule } from 'src/banks/banks.module';
import { config } from 'src/config';
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
    ServeStaticModule.forRoot({
      renderPath: '/',
      rootPath: join(__dirname, '..', '..', 'static'),
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      plugins: [new ApolloComplexityPlugin(config.app.maxQueryComplexity)],
      context: ({ req }) => ({ req }),
      cors: {
        crossDomain: true,
        credentials: true,
        origin: true,
      },
      autoSchemaFile: 'schema.gql',
    }),
    MailerModule.forRoot({
      transport: {
        pool: true,
        service: 'Gmail',
        auth: config.mail,
      },
      defaults: {
        from: '"No Reply" <no-reply@mymoney>',
      },
      preview: false,
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
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
