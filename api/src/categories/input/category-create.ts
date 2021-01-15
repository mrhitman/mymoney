import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CategoryCreate {
  @Field()
  @IsString()
  readonly name: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'Shows is this category ??',
  })
  @IsBoolean()
  readonly isFixed: boolean;

  @Field(() => String)
  @IsString()
  readonly baseCategoryId: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  readonly parent: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsOptional()
  readonly createdAt: number;
}
