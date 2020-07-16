import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsObject, IsString } from 'class-validator';
import { Icon } from './icon';
import { CategoryType } from '../category-type';

@ObjectType('Category')
export class Category {
  @Field((type) => ID)
  @IsString()
  readonly id: string;

  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsBoolean()
  readonly isFixed: boolean;

  @Field(() => CategoryType, { nullable: true })
  @IsString()
  readonly type: CategoryType;

  @Field((type) => Icon, { nullable: true })
  @IsObject()
  readonly icon: Icon;

  @IsString()
  readonly parent: string;
}
