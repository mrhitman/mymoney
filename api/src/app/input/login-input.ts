import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsString()
  email: string;

  @Field((type) => String)
  @IsString()
  password: string;
}
