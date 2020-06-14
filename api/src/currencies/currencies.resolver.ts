import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { CurrencyDto } from './dto/currency.dto';
import { CurrenciesService } from './currencies.service';

@Resolver(of => CurrencyDto)
export class CurrenciesResolver {
    constructor(private readonly service: CurrenciesService) { }

    @Query(returns => [CurrencyDto])
    async currencies(): Promise<CurrencyDto[]> {
        return this.service.findAll()
    }

    @Query(returns => CurrencyDto)
    async currency(@Args('id') id: string): Promise<CurrencyDto> {
        const currency = await this.service.findOne(id);

        if (!currency) {
            throw new NotFoundException(id);
        }

        return currency;
    }
}