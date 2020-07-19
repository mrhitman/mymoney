import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PocketInput } from 'src/wallets/input/pocket-input';

@InputType()
export class GoalCreate {
  @Field((type) => Float)
  @IsNumber()
  readonly goal: number;

  @Field((type) => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ allowNaN: true })
  readonly progress: number;

  @Field()
  @IsString()
  readonly name: string;

  @Field((type) => [PocketInput], { nullable: true })
  @IsOptional({ each: true })
  readonly pockets?: PocketInput[];

  @Field()
  @IsString()
  readonly currencyId: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly createdAt?: Date;
}
