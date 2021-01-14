import { Field, Float, ObjectType } from '@nestjs/graphql';
import { PocketDto } from 'src/wallets/dto/pocket.dto';
import { WalletDto } from 'src/wallets/dto/wallet.dto';

@ObjectType('StatisticByPeriod', {
  description: 'Statistic info about transactions',
})
export class StatisticByPeriodDto {
  @Field()
  readonly walletId: string;

  @Field(() => Float)
  readonly userId: number;

  @Field((type) => [PocketDto])
  readonly pockets: PocketDto[];

  @Field(() => Float)
  readonly createdAt: Date;

  @Field(() => WalletDto)
  readonly wallet: WalletDto;
}
