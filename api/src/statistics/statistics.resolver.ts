import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Interval } from 'common';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { TransactionType } from 'src/transactions/transaction-type';
import { StatisticByCategoryDto } from './dto/statistic-by-category.dto';
import { StatisticByCurrencyDto } from './dto/statistic-by-currency.dto';
import { StatisticByPeriodDto } from './dto/statistic-by-period.dto';
import { StatisticsService } from './statistics.service';

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
    @Args('currencyName', { nullable: true, description: "Currency short name, eg. USD" }) currencyName: string,
    @Args('type', { nullable: true, type: () => TransactionType }) type: TransactionType,
    @Args('from', { nullable: true, description: "Unix timestamp" }) from: number,
    @Args('to', { nullable: true, description: "Unix timestamp" }) to: number,
  ) {
    return this.service.getStatisticByCategory(user, { walletIds, currencyName, type, from, to });
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [StatisticByCurrencyDto])
  public async statisticByCurrency(@CurrentUser() user: User) {
    return this.service.getStatisticByCurrency(user);
  }
}
