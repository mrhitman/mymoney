import { Logger, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { Interval } from 'common';
import User from 'src/database/models/user.model';
import { CurrentUser } from '../auth/current-user';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import { StatisticByPeriodDto } from './dto/statistic-by-period.dto';
import { StatisticsService } from './statistics.service';
import { StatisticByCurrencyDto } from './dto/statistic-by-currency.dto';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { DataLoader } from 'src/dataloader';
import { StatisticByCategoryDto } from './dto/statistic-by-category.dto';

@Resolver()
export class StatisticsResolver {
  constructor(protected readonly service: StatisticsService,
    private readonly loader: DataLoader
  ) {
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
  public async statisticByCategory(@CurrentUser() user: User) {
    return this.service.getStatisticByCategory(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [StatisticByCurrencyDto])
  public async statisticByCurrency(@CurrentUser() user: User) {
    return this.service.getStatisticByCurrency(user);
  }
}
