import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsOptional, IsEmail } from 'class-validator';

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

  @Field()
  @IsString()
  password: string;
}
