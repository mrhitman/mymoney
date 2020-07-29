import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType('StatisticByPeriod', {
  description: "Statistic info about transactions",
})
export class StatisticByPeriodDto {
  @Field({ complexity: 6 })
  readonly date: string;

  @Field(() => Float, { complexity: 6 })
  readonly amount: number;
}
