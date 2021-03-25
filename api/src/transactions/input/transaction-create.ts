import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { TransactionType } from '../transaction-type';
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

@InputType()
export class TransactionCreate {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly id?: string;

  @Field()
  @IsString()
  readonly categoryId: string;

  @Field()
  @IsString()
  readonly currencyId: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.type !== 'income')
  readonly sourceWalletId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.type !== 'outcome')
  readonly destinationWalletId?: string;

  @Field(() => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly fine?: number;

  @Field(() => Float)
  @IsNumber()
  readonly amount: number;

  @Field(() => Int)
  @IsNumber()
  readonly date: number;

  @Field()
  @IsString()
  readonly type: TransactionType;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isNecessary?: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isTemplate?: boolean;

  @Field(() => Int, { nullable: true })
  @IsNumber({ allowNaN: true })
  @IsOptional()
  readonly createdAt?: number;
}
