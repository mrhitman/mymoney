import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { CategoryType } from '../category-type';

@InputType()
export class CategoryCreate {
  @Field((type) => ID)
  @IsString()
  readonly id: string;

  @Field()
  @IsString()
  readonly name: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Shows is this category ??',
  })
  @IsBoolean()
  readonly isFixed: boolean;

  @Field((type) => String)
  @IsString()
  readonly baseCategoryId: string;

  @Field((type) => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly parent: string;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly createdAt: number;
}
