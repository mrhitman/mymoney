import { Field, Float, ObjectType } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';

@ObjectType('Pocket')
export class PocketDto {
  @Field()
  readonly currencyId: string;

  @Field(() => Float)
  readonly amount: number;

  @Field(() => CurrencyDto, { complexity: 2 })
  readonly currency: CurrencyDto;
}
