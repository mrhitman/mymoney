import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Refresh')
export class RefreshDto {
  @Field(() => ID)
  readonly accessToken: string;

  @Field()
  readonly refreshToken: string;
}
