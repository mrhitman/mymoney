import { Field, ID, ObjectType, Float } from '@nestjs/graphql';

@ObjectType('Currency')
export class CurrencyDto {
  @Field((type) => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly description?: string;

  @Field()
  readonly symbol: string;

  @Field((type) => Float, {
    nullable: true,
    description: 'Rate to EUR (from fixer.io)',
    complexity: 6,
  })
  readonly rate?: number;
}
