import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CategoryUpdate {
  @Field(() => ID)
  @IsString()
  readonly id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly name: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Shows is this category ??',
  })
  @IsBoolean()
  @IsOptional()
  readonly isFixed: boolean;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  readonly parent: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly updatedAt: number;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly deletedAt: number;
}
