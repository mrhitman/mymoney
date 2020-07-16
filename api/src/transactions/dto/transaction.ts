import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { Wallet } from 'src/wallets/dto/wallet';

@ObjectType('Transaction')
export class Transaction {
  @Field((type) => ID)
  @IsString()
  readonly id: string;

  @Field()
  readonly type: string;

  @Field()
  readonly categoryId: string;

  @Field({ nullable: true })
  readonly currencyId: string;

  @Field({ nullable: true })
  readonly currency: CurrencyDto;

  @Field({ nullable: true })
  readonly sourceWalletId: string;

  @Field({ nullable: true })
  readonly sourceWallet: Wallet;

  @Field({ nullable: true })
  readonly destinationWalletId: string;

  @Field({ nullable: true })
  readonly destinationWallet: Wallet;

  @Field((type) => Float)
  readonly amount: number;

  @Field((type) => Float, { nullable: true })
  readonly fine: number;

  @Field((type) => Date)
  readonly date: Date;

  @Field({ nullable: true })
  readonly description: string;

  @Field((type) => Int)
  readonly createdAt: number;
}
