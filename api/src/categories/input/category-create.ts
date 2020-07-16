import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { CategoryType } from '../category-type';
import { Icon } from '../dto/icon';

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

  @Field(() => CategoryType, {
    nullable: true,
    description: '',
  })
  @IsEnum(['income', 'outcome', 'transfer'])
  readonly type: CategoryType;

  @Field((type) => Icon, { nullable: true })
  @IsObject()
  readonly icon: Icon;

  @IsString()
  readonly parent: string;

  @Field((type) => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly createdAt: number;
}