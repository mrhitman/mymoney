import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType('StatisticByPeriod', {
  description: "Statistic info about transactions"
})
export class StatisticByPeriodDto {
  @Field()
  readonly date: string;

  @Field(() => Float)
  readonly amount: number;
}