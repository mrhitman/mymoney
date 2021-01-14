import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import graphqlTypeJson from 'graphql-type-json';
import { UserCategoryDto } from 'src/categories/dto/user-category.dto';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { WalletDto } from 'src/wallets/dto/wallet.dto';
import { TransactionType } from '../transaction-type';

@ObjectType('Transaction')
export class TransactionDto {
  @Field(() => ID)
  @IsString()
  readonly id: string;

  @Field(() => TransactionType)
  readonly type: TransactionType;

  @Field({ nullable: true })
  readonly categoryId?: string;

  @Field({ nullable: true, complexity: 2 })
  readonly category?: UserCategoryDto;

  @Field()
  readonly currencyId: string;

  @Field({ complexity: 2 })
  readonly currency: CurrencyDto;

  @Field({ nullable: true })
  readonly sourceWalletId: string;

  @Field({ nullable: true, complexity: 2 })
  readonly sourceWallet: WalletDto;

  @Field({ nullable: true })
  readonly destinationWalletId: string;

  @Field({ nullable: true, complexity: 2 })
  readonly destinationWallet: WalletDto;

  @Field(() => Float)
  readonly amount: number;

  @Field(() => Float, { nullable: true })
  readonly fine?: number;

  @Field(() => Date)
  readonly date: Date;

  @Field({ nullable: true })
  readonly description?: string;

  @Field(() => graphqlTypeJson, { nullable: true })
  readonly meta?: any;

  @Field(() => Boolean)
  readonly isImported: boolean;

  @Field(() => Boolean)
  readonly isNecessary: boolean;

  @Field(() => Int)
  readonly createdAt: number;
}
