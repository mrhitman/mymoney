import { Field, Float, ObjectType } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';

@ObjectType('Pocket')
export class Pocket {
  @Field()
  currencyId: string;

  @Field((type) => Float)
  amount: number;

  @Field((type) => CurrencyDto)
  currency: CurrencyDto;
}
