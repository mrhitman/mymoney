import { Parent, ResolveProperty, Resolver } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { DataLoader } from '../dataloader';
import { PocketDto } from './dto/pocket.dto';

@Resolver((of) => PocketDto)
export class PocketResolver {
  constructor(private readonly loader: DataLoader) {}

  @ResolveProperty('currency', () => CurrencyDto)
  async getCurrency(@Parent() pocket: PocketDto) {
    return this.loader.currency.load(pocket.currencyId);
  }
}
