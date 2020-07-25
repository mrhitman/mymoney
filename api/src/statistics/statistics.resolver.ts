import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/current-user';
import User from 'src/database/models/user.model';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import { StatisticByPeriodDto } from './dto/statistic-by-period.dto';

@Resolver()
export class StatisticsResolver {
  @UseGuards(GqlAuthGuard)
  @Query((returns) => StatisticByPeriodDto)
  public async statisticByPeriod(
    @CurrentUser() user: User,
  ): Promise<StatisticByPeriodDto> {
    return {
      type: 'simple',
    };
  }
}
