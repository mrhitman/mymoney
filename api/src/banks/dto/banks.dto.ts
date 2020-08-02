import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('BankConnection')
export class BankConnectionDto {
    @Field()
    readonly type: string;

    @Field(() => String)
    readonly date: String;
}
