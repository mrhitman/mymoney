import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsObject, IsString } from 'class-validator';
import { IconDto } from './icon.dto';
import { CategoryType } from '../category-type';

@ObjectType('Category')
export class CategoryDto {
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

  @Field((type) => IconDto, { nullable: true })
  @IsObject()
  readonly icon: IconDto;

  @IsString()
  readonly parent: string;
}
