import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import { DataLoader } from 'src/dataloader';
import { StatisticByCurrencyDto } from './dto/statistic-by-currency.dto';

@Resolver(() => StatisticByCurrencyDto)
export class StatisticsByCurrencyResolver {
  constructor(protected loader: DataLoader) {}

  @ResolveField('currency', () => CurrencyDto)
  public async getCurrency(@Parent() parent: StatisticByCurrencyDto) {
    return this.loader.currency.load(parent.currencyId);
  }
}
