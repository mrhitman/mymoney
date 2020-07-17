import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IconDto {
  @Field()
  readonly type: string;

  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly backgroundColor: string;

  @Field({ nullable: true })
  readonly color: string;
}
