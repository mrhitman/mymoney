import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
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

  @Field({ nullable: true })
  @IsString()
  password?: string;

  @Field({ nullable: true })
  @IsString()
  oldPassword?: string;

  @Field(() => graphqlTypeJson, { nullable: true })
  readonly additional?: any;
}
