import { Injectable } from '@nestjs/common';
import Loader from 'dataloader';
import UserCategory from 'src/database/models/user-category.model';
import Currency from 'src/database/models/currency.model';
import Wallet from 'src/database/models/wallet.model';

@Injectable()
export class DataLoader {
  public category = new Loader(
    (ids: string[]) => {
      this.category.clearAll();
      return UserCategory.query().whereIn('id', ids);
    },
    { batch: false },
  );

  public currency = new Loader(
    (ids: string[]) => {
      return Currency.query().whereIn('id', ids);
    },
    { batch: false },
  );

  public wallet = new Loader(
    (ids: string[]) => {
      this.wallet.clearAll();
      return Wallet.query().whereIn('id', ids);
    },
    { batch: false },
  );
}
