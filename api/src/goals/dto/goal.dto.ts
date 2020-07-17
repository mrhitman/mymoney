import { IsNumber, IsString } from 'class-validator';
import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';
import { WalletDto } from '../../wallets/dto/wallet.dto';
import { CurrencyDto } from '../../currencies/dto/currency.dto';

@ObjectType('Goal')
export class GoalDto {
  @Field((type) => ID)
  readonly id: string;

  @Field((type) => Float)
  readonly goal: number;

  @Field((type) => Float)
  readonly progress: number;

  @Field((type) => Float, { complexity: 2 })
  readonly progressPercent: number;

  @Field((type) => String)
  readonly walletId: string;

  @Field((type) => WalletDto, { complexity: 2 })
  readonly wallet: WalletDto;

  @Field((type) => String)
  readonly currencyId: string;

  @Field((type) => CurrencyDto, { complexity: 2 })
  readonly currency: CurrencyDto;

  @Field((type) => Int)
  readonly syncAt: Date;

  @Field((type) => Int)
  readonly createdAt: Date;
}
