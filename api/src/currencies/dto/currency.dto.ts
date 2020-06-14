import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Currency')
export class CurrencyDto {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field()
    symbol: string;
}