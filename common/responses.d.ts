import { Icon } from "common/icon";
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
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

export type GetCategoriesResponse = Array<GetCategoriesResponse>;

export interface RefreshResponse extends LoginResponse {}
