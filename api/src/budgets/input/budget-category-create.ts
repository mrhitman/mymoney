import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class BudgetCategoryCreate {
  @Field()
  @IsString()
  readonly categoryId: string;

  @Field()
  @IsNumber()
  readonly amount: number;

  @Field()
  @IsNumber()
  progress: number;

  @Field({
    description: 'Recalculate progress from exists transaction in budget period',
    nullable: true,
  })
  @IsBoolean()
  @IsOptional()
  readonly recalculateProgress: boolean;
}
