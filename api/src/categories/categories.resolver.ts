import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { CategoriesService } from './categories.service';
import { Category } from './dto/category';

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private readonly service: CategoriesService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Category])
  async categories(
    @CurrentUser() user: User,
    @Args('type', { nullable: true }) type?: string,
  ): Promise<Category[]> {
    return this.service.getAll(user, { type });
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => Category)
  async category(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<Category> {
    return this.service.findOne(id, user);
  }
}
