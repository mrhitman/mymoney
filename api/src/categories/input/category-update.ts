import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CategoryType } from '../category-type';

@InputType()
export class CategoryUpdate {
  @Field((type) => ID)
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

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly updatedAt: number;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly deletedAt: number;
}
