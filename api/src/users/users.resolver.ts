import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import User from '../database/models/user.model';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Resolver((of) => UserDto)
export class UsersResolver {
  constructor(private readonly service: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => UserDto)
  public async profile(@CurrentUser() user: User): Promise<UserDto> {
    return user;
  }
}
