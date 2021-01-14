import { Field, Float, ObjectType } from '@nestjs/graphql';
import { UserCategoryDto } from 'src/categories/dto/user-category.dto';

@ObjectType('StatisticByCategory', {
  description: 'Statistic info about transactions',
})
export class StatisticByCategoryDto {
  @Field({ complexity: 4 })
  readonly categoryId: string;

  @Field({ complexity: 4 })
  readonly category: UserCategoryDto;

  @Field(() => Float, { complexity: 4 })
  readonly amount: number;
}
