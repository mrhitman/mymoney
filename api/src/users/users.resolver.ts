import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import User from '../database/models/user.model';
import { UserDto } from './dto/user.dto';
import { UserUpdate } from './input/user-update';
import { UsersService } from './users.service';

@Resolver((of) => UserDto)
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => UserDto)
  public async profile(@CurrentUser() user: User): Promise<UserDto> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => UserDto)
  public async updateProfile(
    @CurrentUser() user: User,
    @Args('profileUpdateData')
    data: UserUpdate,
  ): Promise<UserDto> {
    await user.$query().update(data);

    return user;
  }
}
