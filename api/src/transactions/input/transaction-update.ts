import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';

@InputType()
export class TransactionUpdate {
  @Field()
  @IsString()
  readonly id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly categoryId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly currencyId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.type !== 'income')
  readonly sourceWalletId: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.type !== 'outcome')
  readonly destinationWalletId: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly fine: number;

  @Field(() => Int)
  @IsNumber()
  readonly date: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly description: string;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isNecessary: boolean;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  readonly isTemplate: boolean;

  @Field(() => Int, { nullable: true })
  @IsNumber({ allowNaN: true })
  @IsOptional()
  readonly updatedAt: number;

  @Field(() => Int, { nullable: true })
  @IsNumber({ allowNaN: true })
  @IsOptional()
  readonly deletedAt: number;
}
