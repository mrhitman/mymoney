import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

@InputType()
export class TransactionCreate {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly id: string;

  @Field()
  @IsString()
  readonly categoryId: string;

  @Field()
  @IsString()
  readonly currencyId: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf((o, v) => o.type !== 'income')
  readonly sourceWalletId: string;

  @Field({ nullable: true })
  @IsString()
  @ValidateIf((o, v) => o.type !== 'outcome')
  readonly destinationWalletId: string;

  @Field((type) => Float, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly fine: number;

  @Field((type) => Float)
  @IsNumber()
  readonly amount: number;

  @Field((type) => Int)
  @IsNumber()
  readonly date: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly description: string;

  @Field((type) => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isNecessary: boolean;

  @Field((type) => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isTemplate: boolean;

  @Field((type) => Int, { nullable: true })
  @IsNumber({ allowNaN: true })
  @IsOptional()
  readonly createdAt: number;
}
