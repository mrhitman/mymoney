import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { loaders } from '../dataloaders';
import { PocketDto } from './dto/pocket.dto';

@Resolver((of) => PocketDto)
export class PocketResolver {
  @ResolveProperty('currency', () => CurrencyDto)
  async getCurrency(@Parent() pocket: PocketDto) {
    return loaders.currency.load(pocket.currencyId);
  }
}
