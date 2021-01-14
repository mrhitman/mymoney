import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { TransactionType } from 'src/transactions/transaction-type';
import { DataLoader } from '../dataloader';
import { StatisticByCategoryDto } from './dto/statistic-by-category.dto';
import { StatisticByCurrencyDto } from './dto/statistic-by-currency.dto';
import { StatisticByPeriodDto } from './dto/statistic-by-period.dto';
import { StatisticsService, Interval } from './statistics.service';

@Resolver()
export class StatisticsResolver {
  constructor(protected readonly service: StatisticsService, private readonly loader: DataLoader) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [StatisticByPeriodDto])
  public async statisticByPeriod(
    @CurrentUser() user: User,
    @Args('interval', { nullable: true, defaultValue: 'month' }) interval: Interval = 'month',
    @Args('walletIds', { nullable: true, type: () => [String] }) walletIds: string[],
    @Args('currencyName', { nullable: true, description: 'Currency short name, eg. USD' })
    currencyName: string,
    @Args('type', { nullable: true, type: () => TransactionType }) type: TransactionType,
    @Args('from', { nullable: true, description: 'Unix timestamp' }) from: number,
    @Args('to', { nullable: true, description: 'Unix timestamp' }) to: number,
  ) {
    return this.service.getStatisticByPeriod(user, { interval, from, to });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [StatisticByCategoryDto], { description: 'Statistic grouped by categories' })
  public async statisticByCategory(
    @CurrentUser() user: User,
    @Args('walletIds', { nullable: true, type: () => [String] }) walletIds: string[],
    @Args('currencyName', { nullable: true, description: 'Currency short name, eg. USD' })
    currencyName: string,
    @Args('type', { nullable: true, type: () => TransactionType }) type: TransactionType,
    @Args('from', { nullable: true, description: 'Unix timestamp' }) from: number,
    @Args('to', { nullable: true, description: 'Unix timestamp' }) to: number,
  ) {
    return this.service.getStatisticByCategory(user, { walletIds, currencyName, type, from, to });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [StatisticByCurrencyDto])
  public async statisticByCurrency(
    @CurrentUser() user: User,
    @Args('walletIds', { nullable: true, type: () => [String] }) walletIds: string[],
  ) {
    return this.service.getStatisticByCurrency(user, { walletIds });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  public async generateHistory(
    @CurrentUser() user: User,
    @Args('walletId') walletId: string,
    @Args('clearOldHistory') clearOldHistory: boolean,
  ) {
    try {
      // @TODO: remove temporary endpoint
      await this.service.generateHistory(user, walletId, clearOldHistory);
      return 'OK';
    } catch (e) {
      return 'FAIL';
    }
  }
}
