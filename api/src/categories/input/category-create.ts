import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Icon } from './icon';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@InputType()
export class CategoryCreate {
  @Field(() => ID, { nullable: true })
  @IsString()
  @IsOptional()
  readonly id?: string;

  @Field()
  @IsString()
  readonly name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Shows is this category ??',
  })
  @IsBoolean()
  @IsOptional()
  readonly isFixed?: boolean;

  @Field()
  @IsString()
  readonly baseCategoryId: string;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  readonly codes: number[];

  @Field(() => Icon, { nullable: true })
  @IsOptional()
  readonly icon: Icon;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly parent?: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly createdAt?: number;
}
