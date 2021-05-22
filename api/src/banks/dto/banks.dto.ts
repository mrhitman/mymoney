import graphqlTypeJson from 'graphql-type-json';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('BankConnection')
export class BankConnectionDto {
  @Field()
  readonly id: string;

  @Field()
  readonly type: string;

  @Field()
  readonly description: string;

  @Field({ nullable: true })
  readonly enabled: boolean;

  @Field(() => String, { nullable: true })
  readonly createdAt: string;

  @Field(() => graphqlTypeJson)
  readonly meta: any;
}
