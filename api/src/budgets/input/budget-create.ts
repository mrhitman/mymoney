import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class BudgetCreate {
  @Field(() => ID)
  @IsString()
  readonly id: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  readonly date: Date;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly createdAt: number;
}
