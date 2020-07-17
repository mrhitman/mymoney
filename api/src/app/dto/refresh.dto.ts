import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Refresh')
export class RefreshDto {
  @Field((type) => ID)
  readonly accessToken: string;

  @Field()
  readonly refreshToken: string;
}
