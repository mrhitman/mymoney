import { Field, Float, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class GoalSave {
  @Field()
  @IsString()
  readonly toGoalId: string;

  @Field()
  @IsString()
  readonly fromWalletId: string;

  @Field()
  @IsString()
  readonly currencyId: string;

  @Field((type) => Float)
  @IsNumber()
  readonly amount: number;
}
