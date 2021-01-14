import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserCategoryDto } from 'src/categories/dto/user-category.dto';
import { DataLoader } from 'src/dataloader';
import { BudgetCategoryDto } from './dto/budget-category.dto';

@Resolver(() => BudgetCategoryDto)
export class CategoryResolver {
  constructor(protected loader: DataLoader) {}

  @ResolveField('category', () => UserCategoryDto)
  async getCategory(@Parent() budgetCategory: BudgetCategoryDto) {
    return this.loader.category.load(budgetCategory.categoryId);
  }
}
