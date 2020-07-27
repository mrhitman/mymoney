import { Logger, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Interval } from 'common';
import User from 'src/database/models/user.model';
import { CurrentUser } from '../auth/current-user';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
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
  @Query((returns) => [StatisticByPeriodDto])
  public async statisticByCategory(@CurrentUser() user: User) {
    const data = await this.service.getStatisticByCategory(user);
    Logger.debug(data);
    return [];
  }
}
