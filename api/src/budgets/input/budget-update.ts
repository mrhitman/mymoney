import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
export class BudgetUpdate {
  @Field(() => ID)
  @IsString()
  readonly id: string;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  readonly date: Date;

  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  readonly deadline: Date;
}
