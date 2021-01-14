import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import bcrypt from 'bcryptjs';
import omit from 'lodash/omit';
import { CurrentUser } from '../auth/current-user';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import User from '../database/models/user.model';
import { UserDto } from './dto/user.dto';
import { UserUpdate } from './input/user-update';
import { UsersService } from './users.service';

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => UserDto)
  public async profile(@CurrentUser() user: User): Promise<UserDto> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UserDto)
  public async updateProfile(
    @CurrentUser() user: User,
    @Args('profileUpdateData')
    data: UserUpdate,
  ): Promise<UserDto> {
    const fullUser = await User.query().findById(user.id);
    if (data.password) {
      const password = await bcrypt.hash(data.password, 10);

      if (!(await bcrypt.compare(data.oldPassword, fullUser.password))) {
        throw new BadRequestException();
      }

      data.password = password;
    }

    await fullUser.$query().update({
      ...omit(data, ['oldPassword']),
      additional: fullUser.additional || data.additional || {},
    });

    return omit(fullUser, ['password']);
  }
}
