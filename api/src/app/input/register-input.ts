import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail, IsObject } from 'class-validator';
import graphqlTypeJson from 'graphql-type-json';

@InputType()
export class RegisterInput {
  @Field()
  @IsString()
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  middleName?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastName?: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  imageUrl: string;

  @Field(() => graphqlTypeJson, { nullable: true })
  @IsOptional()
  @IsObject()
  additional: any;

  @Field()
  @IsString()
  password: string;
}
