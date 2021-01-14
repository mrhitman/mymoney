import { Float, Parent, Resolver, ResolveField } from '@nestjs/graphql';
import { CurrenciesService } from 'src/currencies/currencies.service';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';

@Resolver(() => CurrencyDto)
export class CurrencyRateResolver {
  constructor(protected service: CurrenciesService) {}

  @ResolveField('rate', () => Float)
  async getRate(@Parent() currency: CurrencyDto) {
    const rates = await this.service.rates();
    return rates.rates[currency.name] || 0;
  }
}
