export interface Pocket {
  id: string;
  amount: number;
  currencyId: string;
}

export interface Wallet {
  id: string;
  userId: number;
  name: string;
  description: string;
  cardNumber: string;
  type: string;
  pockets: Pocket[];
  lastSync: Date;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  userId: number;
  parent: string;
  type: string;
  icon: any;
  isFixed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  syncAt: Date;
}

export interface Currency {
  id: string;
  name: string;
  description: string;
  symbol: string;
  flagCode: string;
  rate: number;
}

export interface GetCurrencyResponse extends Currency {}

export interface GetRateResponse {
  success: boolean;
  timestamp: number;
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}
export interface RefreshResponse extends LoginResponse {}
export interface GetCategoryResponse extends Category {}
export interface GetWalletResponse extends Wallet {}