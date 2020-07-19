import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { DataLoader } from '../dataloader';
import { PocketDto } from './dto/pocket.dto';

@Resolver((of) => PocketDto)
export class PocketResolver {
  constructor(private readonly loader: DataLoader) {}

  @ResolveField('currency', () => CurrencyDto)
  async getCurrency(@Parent() pocket: PocketDto) {
    return this.loader.currency.load(pocket.currencyId);
  }
}
