import { ObjectType, Field } from '@nestjs/graphql';
import { UserCategoryDto } from 'src/categories/dto/user-category.dto';

@ObjectType('BudgetCategory')
export class BudgetCategoryDto {
  @Field()
  readonly categoryId: string;

  @Field()
  readonly category: UserCategoryDto;

  @Field()
  readonly amount: number;

  @Field()
  readonly progress: number;
}
