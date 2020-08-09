import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CategoryDto } from 'src/categories/dto/category.dto';
import { DataLoader } from 'src/dataloader';
import { BudgetCategoryDto } from './dto/budget-category.dto';

@Resolver((of) => BudgetCategoryDto)
export class CategoryResolver {
  constructor(protected loader: DataLoader) { }

  @ResolveField('category', () => CategoryDto)
  async getCategory(@Parent() budgetCategory: BudgetCategoryDto) {
    return this.loader.category.load(budgetCategory.categoryId);
  }
}
