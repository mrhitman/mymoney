import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType('StatisticByCategory', {
  description: "Statistic info about transactions"
})
export class StatisticByCategoryDto {
  @Field({ complexity: 6 })
  readonly categoryId: string;

  @Field(() => Float, { complexity: 6 })
  readonly amount: number;
}
