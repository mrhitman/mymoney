import { PocketInput } from 'src/generated/graphql';

export interface AddWalletPocket {
  currencyId: string;
  amount: number;
}

export interface AddWalletValues {
  name: string;
  description: string;
  allowNegativeBalance: boolean;
  useInBalance: boolean;
  useInAnalytics: boolean;
  pockets: PocketInput[];
  tags: string[];
}

export interface UpdateWalletValues extends AddWalletValues {
  id: string;
}
