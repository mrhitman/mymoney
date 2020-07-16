import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import User from '../database/models/user.model';
import { PocketDto } from './dto/pocket';
import { WalletCreateInput } from './dto/wallet-create-input';
import { WalletUpdateInput } from './dto/wallet-update-input';
import { WalletDto } from './dto/wallet.dto';
import { WalletsService } from './wallets.service';

@Resolver((of) => WalletDto)
export class WalletsResolver {
  constructor(private readonly service: WalletsService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [WalletDto])
  async wallets(@CurrentUser() user: User): Promise<WalletDto[]> {
    return this.service.getAll(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => WalletDto)
  async wallet(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<WalletDto> {
    return this.service.findOne(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => WalletDto)
  async createWallet(
    @CurrentUser() user: User,
    @Args('walletCreateData')
    data: WalletCreateInput,
  ): Promise<WalletDto> {
    return this.service.create(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => WalletDto)
  async updateWallet(
    @CurrentUser() user: User,
    @Args('walletUpdateData')
    data: WalletUpdateInput,
  ): Promise<WalletDto> {
    return this.service.update(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => WalletDto)
  async deleteWallet(
    @CurrentUser() user: User,
    @Args('id') id: string,
  ): Promise<WalletDto> {
    return this.service.delete(user, id);
  }
}
