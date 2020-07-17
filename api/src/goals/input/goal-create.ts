import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class GoalCreate {
  @Field((type) => Float)
  @IsNumber()
  readonly goal: number;

  @Field((type) => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ allowNaN: true })
  readonly progress: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly walletId?: string;

  @Field()
  @IsString()
  readonly currencyId: string;

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly createdAt?: Date;
}
