import { Field, ObjectType } from '@nestjs/graphql';
import { BudgetCategoryDto } from './budget-category.dto';

@ObjectType('Budget')
export class BudgetDto {
  @Field()
  readonly id: string;

  @Field(() => [BudgetCategoryDto])
  readonly outcomes: BudgetCategoryDto[];

  @Field(() => [BudgetCategoryDto])
  readonly incomes: BudgetCategoryDto[];

  @Field(() => Date)
  readonly date: Date;

  @Field(() => Date)
  readonly deadline: Date;
}
