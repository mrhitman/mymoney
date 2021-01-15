import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CategoryType } from '../category-type';
import { IconDto } from './icon.dto';

@ObjectType('Category')
export class CategoryDto {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly description: string;

  @Field()
  readonly isFixed: boolean;

  @Field(() => CategoryType, { nullable: true })
  readonly type: CategoryType;

  @Field(() => IconDto, { nullable: true })
  readonly icon: IconDto;

  @Field(() => [Number])
  readonly codes: number[];

  readonly parent: string;
}
