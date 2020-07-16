import DataLoader from 'dataloader';
import Category from 'src/database/models/category.model';
import Currency from 'src/database/models/currency.model';
import Wallet from './database/models/wallet.model';

export const loaders = {
  category: new DataLoader((ids: string[]) => {
    loaders.category.clearAll();

    return Category.query().whereIn('id', ids);
  }),
  currency: new DataLoader((ids: string[]) => {
    return Currency.query().whereIn('id', ids);
  }),
  wallet: new DataLoader((ids: string[]) => {
    loaders.wallet.clearAll();

    return Wallet.query().whereIn('id', ids);
  }),
};
