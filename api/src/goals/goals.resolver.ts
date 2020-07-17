import { UseGuards } from '@nestjs/common';
import {
  Args,
  Query,
  Resolver,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { GoalDto } from './dto/goal.dto';
import { GoalsService } from './goals.service';
import { WalletDto } from '../wallets/dto/wallet.dto';
import { loaders } from '../dataloaders';

@Resolver((of) => GoalDto)
export class WalletsResolver {
  constructor(private readonly service: GoalsService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [GoalDto])
  async goals(@CurrentUser() user: User) {
    return this.service.getAll(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [GoalDto])
  async goal(@CurrentUser() user: User, @Args('id') id: string) {
    return this.service.findOne(user, id);
  }

  @ResolveProperty('wallet', () => WalletDto)
  async getWallet(@Parent() goal: GoalDto) {
    return loaders.wallet.load(goal.walletId);
  }
}
