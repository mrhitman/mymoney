import { Field, Float, ID, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class GoalUpdate {
  @Field((type) => ID)
  @IsString()
  readonly id: string;

  @Field((type) => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ allowNaN: true })
  readonly goal: number;

  @Field((type) => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ allowNaN: true })
  readonly progress: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly walletId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly currencyId: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly updatedAt?: Date;
}
