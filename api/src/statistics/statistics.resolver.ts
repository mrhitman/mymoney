import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Interval } from 'common';
import User from 'src/database/models/user.model';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import { StatisticByCategoryDto } from './dto/statistic-by-category.dto';
import { StatisticByCurrencyDto } from './dto/statistic-by-currency.dto';
import { StatisticByPeriodDto } from './dto/statistic-by-period.dto';
import { StatisticsService } from './statistics.service';
import { TransactionType } from 'src/transactions/transaction-type';

@Resolver()
export class StatisticsResolver {
  constructor(protected readonly service: StatisticsService) {
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [StatisticByPeriodDto])
  public async statisticByPeriod(
    @CurrentUser() user: User,
    @Args('interval') interval: Interval = 'month'
  ): Promise<StatisticByPeriodDto[]> {
    return this.service.getStatisticByPeriod(user, { interval });
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [StatisticByCategoryDto])
  public async statisticByCategory(
    @CurrentUser() user: User,
    @Args('walletIds', { nullable: true, type: () => [String] }) walletIds: string[],
    @Args('currencyName', { nullable: true }) currencyName: string,
    @Args('type', { nullable: true, type: () => TransactionType }) type: TransactionType
  ) {
    return this.service.getStatisticByCategory(user, { walletIds, currencyName, type });
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [StatisticByCurrencyDto])
  public async statisticByCurrency(@CurrentUser() user: User) {
    return this.service.getStatisticByCurrency(user);
  }
}
