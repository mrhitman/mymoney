import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { WalletDto } from 'src/wallets/dto/wallet.dto';

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
