import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import User from '../database/models/user.model';
import { WalletDto } from './dto/wallet.dto';
import { WalletsService } from './wallets.service';
import { WalletCreateInput } from './dto/wallet-create-input';

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
    return this.service.getOne(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => WalletDto)
  async createWallet(
    @CurrentUser() user: User,
    @Args('walletCreateData')
    data: WalletCreateInput,
  ): Promise<WalletDto> {
    return this.service.getOne(user, '00708bb2-cdf3-5a23-8a03-bbd051c73c00');
  }
}
