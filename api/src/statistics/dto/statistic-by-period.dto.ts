import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType('StatisticByPeriod')
export class StatisticByPeriodDto {
  @Field()
  readonly date: string;

  @Field(() => Float)
  readonly amount: number;
}
