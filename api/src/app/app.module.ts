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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

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
      plugins: [new ApolloComplexityPlugin(+process.env.MAX_QUERY_COMPLEXITY || 32)],
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
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USER,
          clientId: process.env.MAIL_CLIENT_ID,
          clientSecret: process.env.MAIL_SECRET,
          accessToken: process.env.MAIL_TOKEN,
          refreshToken: process.env.MAIL_REFRESH_TOKEN,
        },
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
