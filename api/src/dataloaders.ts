import DataLoader from 'dataloader';
import Category from 'src/database/models/category.model';
import Currency from 'src/database/models/currency.model';

export const loaders = {
  category: new DataLoader((ids: string[]) => {
    loaders.category.clearAll();

    return Category.query().whereIn('id', ids);
  }),
  currency: new DataLoader((ids: string[]) => {
    return Currency.query().whereIn('id', ids);
  }),
};
