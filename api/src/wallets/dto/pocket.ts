import { Field, Float, InputType, ObjectType } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';

@ObjectType('Pocket')
export class PocketDto {
  @Field()
  currencyId: string;

  @Field((type) => Float)
  amount: number;

  @Field((type) => CurrencyDto)
  currency?: CurrencyDto;
}

@InputType()
export class PocketInput {
  @Field()
  currencyId: string;

  @Field((type) => Float)
  amount: number;
}
