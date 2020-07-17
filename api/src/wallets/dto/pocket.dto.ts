import { Field, Float, ObjectType } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';

@ObjectType('Pocket')
export class PocketDto {
  @Field()
  readonly currencyId: string;

  @Field((type) => Float)
  readonly amount: number;

  @Field((type) => CurrencyDto, { complexity: 2 })
  readonly currency: CurrencyDto;
}
