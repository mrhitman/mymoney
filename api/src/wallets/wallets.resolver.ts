import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { Wallet } from './dto/wallet';
import { WalletCreate } from './input/wallet-create';
import { WalletUpdate } from './input/wallet-update';
import { WalletsService } from './wallets.service';

@Resolver((of) => Wallet)
export class WalletsResolver {
  constructor(private readonly service: WalletsService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Wallet])
  async wallets(@CurrentUser() user: User) {
    return this.service.getAll(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => Wallet)
  async wallet(@CurrentUser() user: User, @Args('id') id: string) {
    return this.service.findOne(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Wallet)
  async createWallet(
    @CurrentUser() user: User,
    @Args('walletCreateData')
    data: WalletCreate,
  ) {
    return this.service.create(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Wallet)
  async updateWallet(
    @CurrentUser() user: User,
    @Args('walletUpdateData')
    data: WalletUpdate,
  ) {
    return this.service.update(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Wallet)
  async deleteWallet(@CurrentUser() user: User, @Args('id') id: string) {
    return this.service.delete(user, id);
  }
}
