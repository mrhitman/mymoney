import { Field, ID, ObjectType, Float } from '@nestjs/graphql';

@ObjectType('Currency')
export class CurrencyDto {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  symbol: string;

  @Field(type => Float, { nullable: true })
  rate?: number;
}
