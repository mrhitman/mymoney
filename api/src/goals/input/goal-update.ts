import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import Wallet from 'src/database/models/wallet.model';
import { PocketInput } from 'src/wallets/input/pocket-input';

@InputType()
export class GoalUpdate {
  @Field((type) => ID)
  @IsString()
  readonly id: string;

  @Field((type) => Float, { nullable: true })
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

  @Field((type) => [PocketInput], { nullable: true })
  @IsOptional({ each: true })
  readonly pockets: PocketInput[];

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly updatedAt: number;
}
