import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class PocketInput {
  @Field()
  currencyId: string;

  @Field(() => Float)
  amount: number;
}
