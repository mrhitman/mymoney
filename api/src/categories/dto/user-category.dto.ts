import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '../category-type';
import { CategoryDto } from './category.dto';
import { IconDto } from './icon.dto';

@ObjectType('UserCategory')
export class UserCategoryDto {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly categoryId: string;

  @Field()
  readonly baseCategory: CategoryDto;

  @Field()
  readonly isFixed: boolean;

  @Field(() => CategoryType, { nullable: true })
  readonly type: CategoryType;

  @Field(() => IconDto, { nullable: true })
  readonly icon: IconDto;

  @Field()
  readonly parent: string;
}
