import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import Wallet from 'src/database/models/wallet.model';

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

  readonly walletId: string;

  readonly wallet: Wallet;

  @Field()
  readonly name: string;

  @Field(() => String)
  readonly currencyId: string;

  @Field((type) => CurrencyDto, { complexity: 2 })
  readonly currency: CurrencyDto;

  @Field((type) => Int)
  readonly syncAt: Date;

  @Field((type) => Int)
  readonly createdAt: Date;
}
