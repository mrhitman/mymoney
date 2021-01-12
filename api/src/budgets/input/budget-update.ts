import { Field, ID, InputType } from '@nestjs/graphql';
import { IsDate, IsOptional, IsString } from 'class-validator';

@InputType()
export class BudgetUpdate {
  @Field((type) => ID)
  @IsString()
  readonly id: string;

  @Field((type) => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  readonly date: Date;

  @Field((type) => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  readonly deadline: Date;
}
