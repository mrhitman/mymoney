import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Icon {
  @Field()
  type: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  backgroundColor: string;

  @Field({ nullable: true })
  color: string;
}
