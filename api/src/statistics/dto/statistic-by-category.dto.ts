import { Field, Float, ObjectType } from '@nestjs/graphql';
import { CategoryDto } from 'src/categories/dto/category.dto';

@ObjectType('StatisticByCategory', {
  description: "Statistic info about transactions"
})
export class StatisticByCategoryDto {
  @Field({ complexity: 4 })
  readonly categoryId: string;

  @Field({ complexity: 4 })
  readonly category: CategoryDto;

  @Field(() => Float, { complexity: 4 })
  readonly amount: number;
}
