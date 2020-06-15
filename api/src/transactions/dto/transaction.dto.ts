import { Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';

@ObjectType('Transaction')
export class TransactionDto {
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
  readonly destinationWalletId: string;

  @Field((type) => Float)
  readonly amount: number;

  @Field((type) => Float, { nullable: true })
  readonly fine: number;

  @Field((type) => Date)
  readonly date: Date;

  @Field({ nullable: true })
  readonly description: string;
}
