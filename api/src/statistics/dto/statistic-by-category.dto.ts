import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType('StatisticByCategory', {
  description: "Statistic info about transactions"
})
export class StatisticByCategoryDto {
  @Field()
  readonly categoryId: string;

  @Field(() => Float)
  readonly amount: number;
}
