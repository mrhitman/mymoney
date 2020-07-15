import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('Pocket')
export class PocketDto {
  @Field()
  currencyId: string;

  @Field((type) => Float)
  amount: number;
}

@InputType()
export class PocketInput {
  @Field()
  currencyId: string;

  @Field((type) => Float)
  amount: number;
}
