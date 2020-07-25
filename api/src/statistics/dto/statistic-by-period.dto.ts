import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('StatisticByPeriod')
export class StatisticByPeriodDto {
  @Field()
  readonly type: string;
}
