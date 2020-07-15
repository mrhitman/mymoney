import { Query, Resolver, Args } from '@nestjs/graphql';
import User from 'src/database/models/user.model';
import { CategoriesService } from './categories.service';
import { CommonCategoryDto } from './dto/common-category.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import { CurrentUser } from 'src/auth/current-user';

@Resolver((of) => CommonCategoryDto)
export class CategoriesResolver {
  constructor(private readonly service: CategoriesService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [CommonCategoryDto])
  async categories(
    @CurrentUser() user: User,
    @Args('type', { nullable: true }) type?: string,
  ): Promise<CommonCategoryDto[]> {
    return this.service.getAll(user, { type });
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => CommonCategoryDto)
  async category(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<CommonCategoryDto> {
    return this.service.findOne(id, user);
  }
}
