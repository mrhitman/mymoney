import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType('StatisticByPeriod2', {
  description: 'Statistic info about transactions',
})
export class StatisticByPeriod2Dto {
  @Field()
  readonly name: string;

  @Field(() => Float)
  readonly amount: number;

  @Field(() => String)
  readonly date: string;
}
