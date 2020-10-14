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
  pockets: AddWalletPocket[];
  tags: string[];
}
