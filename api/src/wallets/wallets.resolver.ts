import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../auth/current-user';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import User from '../database/models/user.model';
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
}
