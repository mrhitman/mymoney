import { UseGuards } from '@nestjs/common';
import {
  Args,
  Float,
  Mutation,
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
import { GoalCreate } from './input/goal-create';
import { GoalUpdate } from './input/goal-update';

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

  @UseGuards(GqlAuthGuard)
  @Mutation(() => GoalDto)
  async createGoal(
    @CurrentUser() user: User,
    @Args('createGoalData') data: GoalCreate,
  ) {
    return this.service.create(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => GoalDto)
  async updateGoal(
    @CurrentUser() user: User,
    @Args('updateGoalData') data: GoalUpdate,
  ) {
    return this.service.update(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => GoalDto)
  async deleteGoal(@CurrentUser() user: User, @Args('id') id: string) {
    return this.service.delete(user, id);
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
