import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DataLoader } from '../dataloader';
import { WalletDto } from '../wallets/dto/wallet.dto';
import { StatisticByPeriodDto } from './dto/statistic-by-period.dto';

@Resolver((of) => StatisticByPeriodDto)
export class WalletHistoryResolver {
  constructor(private readonly loader: DataLoader) {}

  @ResolveField('wallet', () => WalletDto)
  async getCurrency(@Parent() walletHistory: StatisticByPeriodDto) {
    return this.loader.wallet.load(walletHistory.walletId);
  }
}
