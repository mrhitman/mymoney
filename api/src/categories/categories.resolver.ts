import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { CategoriesService } from './categories.service';
import { UserCategoryDto } from './dto/user-category.dto';
import { CategoryDto } from './dto/category.dto';
import { CategoryCreate } from './input/category-create';
import { CategoryUpdate } from './input/category-update';

@Resolver((of) => UserCategoryDto)
export class CategoriesResolver {
  constructor(private readonly service: CategoriesService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [UserCategoryDto])
  async categories(
    @CurrentUser() user: User,
    @Args('type', { nullable: true }) type?: string,
  ): Promise<CategoryDto[]> {
    return this.service.getAll(user, { type });
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [CategoryDto])
  async baseCategories(): Promise<CategoryDto[]> {
    return this.service.getBaseCategories();
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => UserCategoryDto)
  async category(@CurrentUser() user: User, @Args('id') id: string): Promise<UserCategoryDto> {
    return this.service.findOne(id, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => UserCategoryDto)
  async createCategory(@CurrentUser() user: User, @Args('categoryData') data: CategoryCreate) {
    return this.service.create(data, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => UserCategoryDto)
  async updateCategory(@CurrentUser() user: User, @Args('categoryData') data: CategoryUpdate) {
    return this.service.update(data, user);
  }
}
