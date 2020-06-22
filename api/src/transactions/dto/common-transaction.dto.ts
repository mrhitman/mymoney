import { Field, Float, Int } from '@nestjs/graphql';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateIf,
  IsBoolean,
} from 'class-validator';

export class CommonTransactionDto {
  @Field()
  @IsString()
  readonly categoryId: string;

  @Field({ nullable: true })
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

  @Field()
  @IsString()
  readonly description: string;

  @Field((type) => Boolean)
  @IsBoolean()
  readonly isNecessary: boolean;

  @Field((type) => Boolean)
  @IsBoolean()
  readonly isTemplate: boolean;
}
