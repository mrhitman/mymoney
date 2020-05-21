import { Icon } from 'common/icon';
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface Pocket {
  id: string;
  amount: number;
  currencyId: string;
}

export interface GetWalletResponse {
  public id: string;
  public userId: number;
  public name: string;
  public description: string;
  public cardNumber: string;
  public type: string;
  public pockets: Pocket[];
  public lastSync: Date;
  public createdAt: Date;
}

export interface GetCategoryResponse {
  id: string;
  name: string;
  userId: number;
  parent: string;
  type: string;
  icon: Icon;
  isFixed: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  syncAt: Date;
}

export interface RefreshResponse extends LoginResponse {}
