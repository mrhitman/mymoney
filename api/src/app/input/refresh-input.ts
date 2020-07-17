import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RefreshInput {
  @Field(() => String)
  refreshToken: string;
}
