import { Field, InputType } from '@nestjs/graphql';
import { IsObject, IsString } from 'class-validator';
import graphqlTypeJson from 'graphql-type-json';

@InputType()
export class UserUpdate {
  @Field({ nullable: true })
  @IsString()
  readonly firstName?: string;

  @Field({ nullable: true })
  @IsString()
  readonly lastName?: string;

  @Field({ nullable: true })
  @IsString()
  readonly middleName?: string;

  @Field(() => graphqlTypeJson, { nullable: true })
  @IsObject()
  readonly additional?: any;
}
