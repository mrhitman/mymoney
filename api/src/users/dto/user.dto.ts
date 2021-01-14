import { Field, ID, ObjectType } from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';

@ObjectType('User')
export class UserDto {
  @Field(() => ID)
  id: number;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field(() => graphqlTypeJson, { nullable: true })
  additional: any;

  @Field()
  email: string;
}
