import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrenciesService } from './currencies.service';
import { CurrencyDto } from './dto/currency.dto';

@Resolver(() => CurrencyDto)
export class CurrenciesResolver {
  constructor(private readonly service: CurrenciesService) { }

  @Query(() => [CurrencyDto])
  async currencies(@Args('name', { nullable: true }) name: string): Promise<CurrencyDto[]> {
    const currencies = await this.service.findAll(name);
    const rates = await this.service.rates();

    return currencies
      .map((currency) => ({
        ...currency,
        rate: rates.rates[currency.name],
      }))
      .filter(Boolean);
  }

  @Query(() => CurrencyDto)
  async currency(@Args('id') id: string): Promise<CurrencyDto> {
    const currency = await this.service.findOne(id);
    const rates = await this.service.rates();

    if (!currency) {
      throw new NotFoundException(id);
    }

    return { ...currency, rate: rates[currency.name] };
  }

  @Query(() => Number)
  async exchange(
    @Args('amount') amount: number,
    @Args('from', { description: 'Currency name (eg. USD)' })
    fromCurrency: string,
    @Args('to', { description: 'Currency name (eg. USD)' }) toCurrency: string,
  ) {
    const rates = await this.service.rates();
    return this.service.exchange(rates, amount, fromCurrency, toCurrency);
  }
}
