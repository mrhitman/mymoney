import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { WalletDto } from 'src/wallets/dto/wallet.dto';
import { TransactionType } from '../transaction-type';
import { CategoryDto } from '../../categories/dto/category.dto';

@ObjectType('Transaction')
export class TransactionDto {
  @Field((type) => ID)
  @IsString()
  readonly id: string;

  @Field(() => TransactionType)
  readonly type: TransactionType;

  @Field({ nullable: true })
  readonly categoryId?: string;

  @Field({ nullable: true, complexity: 2 })
  readonly category?: CategoryDto;

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

  @Field((type) => Float)
  readonly amount: number;

  @Field((type) => Float, { nullable: true })
  readonly fine?: number;

  @Field((type) => Date)
  readonly date: Date;

  @Field({ nullable: true })
  readonly description?: string;

  @Field((type) => Int)
  readonly createdAt: number;
}
