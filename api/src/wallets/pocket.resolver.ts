import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { loaders } from '../dataloaders';
import { Pocket } from './dto/pocket';

@Resolver((of) => Pocket)
export class PocketResolver {
  @ResolveProperty('currency', () => CurrencyDto)
  async getCurrency(@Parent() pocket: Pocket) {
    return loaders.currency.load(pocket.currencyId);
  }
}
