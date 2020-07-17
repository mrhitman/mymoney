import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field(() => String)
  email: string;

  @Field((type) => String)
  password: string;
}
