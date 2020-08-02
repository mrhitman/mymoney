export enum CategoryType {
  income = 'income',
  outcome = 'outcome',
  transfer = 'transfer',
}

export interface CreateCategoryDto {
  id?: string;
  name: string;
  icon?: {
    name: string;
    type: string;
    backgroundColor?: string;
    color?: string;
  };
  type?: CategoryType;
  parentId?: string;
  codes?: number[];
}
