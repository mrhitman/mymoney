import { UseGuards } from '@nestjs/common';
import {
  Args,
  Float,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql';
import { round } from 'lodash';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { WalletDto } from 'src/wallets/dto/wallet.dto';
import { CurrencyDto } from '../currencies/dto/currency.dto';
import { loaders } from '../dataloaders';
import { GoalDto } from './dto/goal.dto';
import { GoalsService } from './goals.service';

@Resolver((of) => GoalDto)
export class GoalsResolver {
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

  @ResolveProperty('currency', () => CurrencyDto)
  async getCurrency(@Parent() goal: GoalDto) {
    return loaders.currency.load(goal.currencyId);
  }

  @ResolveProperty('progressPercent', () => Float)
  async getProgress(@Parent() goal: GoalDto) {
    return goal.goal > 0 ? round(goal.progress / goal.goal, 3) : 0;
  }
}
