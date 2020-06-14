import { IsBoolean, IsObject, IsString } from 'class-validator';
import { ObjectType, Field, ID } from '@nestjs/graphql';


@ObjectType()
export class Icon {
  @Field()
  type: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  backgroundColor: string;

  @Field({ nullable: true })
  color: string;
}

@ObjectType('Category')
export class CommonCategoryDto {
  @Field(type => ID)
  @IsString()
  readonly id: string;

  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsBoolean()
  readonly isFixed: boolean;

  @Field({ nullable: true })
  @IsString()
  readonly type: string;

  @Field(type => Icon, { nullable: true })
  @IsObject()
  readonly icon: Icon;

  @IsString()
  readonly parent: string;
}
