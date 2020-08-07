import graphqlTypeJson from 'graphql-type-json'
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('BankConnection')
export class BankConnectionDto {
    @Field()
    readonly type: string;

    @Field(() => String)
    readonly createdAt: String;

    @Field(() => graphqlTypeJson)
    readonly meta: object;
}
