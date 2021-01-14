import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PocketInput } from 'src/wallets/input/pocket-input';

@InputType()
export class GoalUpdate {
  @Field(() => ID)
  @IsString()
  readonly id: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ allowNaN: true })
  readonly goal: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly currencyId: string;

  @Field()
  @IsOptional()
  @IsString()
  readonly name: string;

  @Field(() => [PocketInput], { nullable: true })
  @IsOptional({ each: true })
  readonly pockets: PocketInput[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly updatedAt: number;
}
