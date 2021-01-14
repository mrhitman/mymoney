import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import Wallet from 'src/database/models/wallet.model';
import { PocketDto } from 'src/wallets/dto/pocket.dto';

@ObjectType('Goal')
export class GoalDto {
  @Field(() => ID)
  readonly id: string;

  @Field(() => Float)
  readonly goal: number;

  @Field(() => Float)
  readonly progress: number;

  @Field(() => Float, { complexity: 2 })
  readonly progressPercent: number;

  @Field()
  readonly name: string;

  @Field(() => [PocketDto])
  readonly pockets: PocketDto[];

  @Field(() => String)
  readonly currencyId: string;

  @Field(() => CurrencyDto, { complexity: 2 })
  readonly currency: CurrencyDto;

  @Field(() => Int)
  readonly syncAt: Date;

  @Field(() => Int)
  readonly createdAt: Date;

  readonly walletId: string;

  readonly wallet: Wallet;
}
