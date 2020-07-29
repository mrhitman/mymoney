import { ObjectType, Field, Float } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';

@ObjectType('StatisticByCurrency', {
  description: "Statistic info about transactions"
})
export class StatisticByCurrencyDto {
  @Field({ complexity: 4 })
  readonly currencyId: string;

  @Field({ complexity: 4 })
  readonly currency: CurrencyDto;

  @Field(() => Float, { complexity: 4 })
  readonly amount: number;
}
