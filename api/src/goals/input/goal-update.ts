import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PocketInput } from 'src/wallets/input/pocket-input';

@InputType()
export class GoalUpdate {
  @Field(() => ID)
  @IsString()
  readonly id: string;

  @Field(() => Float, { nullable: true })
  @IsNumber({ allowNaN: true })
  @IsOptional()
  readonly goal?: number;

  @Field(() => Float, { nullable: true })
  @IsNumber({ allowNaN: true })
  @IsOptional()
  readonly progress?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly currencyId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @Field(() => [PocketInput], { nullable: true })
  @IsOptional({ each: true })
  readonly pockets?: PocketInput[];

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly updatedAt?: number;
}
