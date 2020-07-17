import { Field, ID, ObjectType, Float } from '@nestjs/graphql';

@ObjectType('Currency')
export class CurrencyDto {
  @Field((type) => ID)
  readonly id: string;

  @Field({ nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field()
  readonly symbol: string;

  @Field((type) => Float, { nullable: true })
  readonly rate?: number;
}
