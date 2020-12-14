import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type BankConnection = {
  __typename?: 'BankConnection';
  id: Scalars['String'];
  type: Scalars['String'];
  description: Scalars['String'];
  enabled?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['String'];
  meta: Scalars['JSON'];
};


export type Currency = {
  __typename?: 'Currency';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  symbol: Scalars['String'];
  code: Scalars['Float'];
  rate: Scalars['Float'];
};

/** Statistic info about transactions */
export type StatisticByCurrency = {
  __typename?: 'StatisticByCurrency';
  currencyId: Scalars['String'];
  currency: Currency;
  amount: Scalars['Float'];
};

export type IconDto = {
  __typename?: 'IconDto';
  type: Scalars['String'];
  name: Scalars['String'];
  backgroundColor?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  name: Scalars['String'];
  isFixed: Scalars['Boolean'];
  type?: Maybe<CategoryType>;
  icon?: Maybe<IconDto>;
};

export enum CategoryType {
  Income = 'income',
  Outcome = 'outcome',
  Transfer = 'transfer'
}

/** Statistic info about transactions */
export type StatisticByCategory = {
  __typename?: 'StatisticByCategory';
  categoryId: Scalars['String'];
  category: Category;
  amount: Scalars['Float'];
};

export type Pocket = {
  __typename?: 'Pocket';
  currencyId: Scalars['String'];
  amount: Scalars['Float'];
  currency: Currency;
};

export type Wallet = {
  __typename?: 'Wallet';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  type: Scalars['String'];
  allowNegativeBalance: Scalars['Boolean'];
  pockets: Array<Pocket>;
  syncAt: Scalars['Int'];
  createdAt: Scalars['Int'];
};

/** Statistic info about transactions */
export type StatisticByPeriod = {
  __typename?: 'StatisticByPeriod';
  walletId: Scalars['String'];
  userId: Scalars['Float'];
  pockets: Array<Pocket>;
  createdAt: Scalars['Float'];
  wallet: Wallet;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  additional: Scalars['JSON'];
  email: Scalars['String'];
};

export type BudgetCategory = {
  __typename?: 'BudgetCategory';
  categoryId: Scalars['String'];
  category: Category;
  amount: Scalars['Float'];
  progress: Scalars['Float'];
};

export type Budget = {
  __typename?: 'Budget';
  id: Scalars['String'];
  outcomes: Array<BudgetCategory>;
  incomes: Array<BudgetCategory>;
  date: Scalars['DateTime'];
  deadline: Scalars['DateTime'];
};


export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  type: TransactionType;
  categoryId?: Maybe<Scalars['String']>;
  category: Category;
  currencyId: Scalars['String'];
  currency: Currency;
  sourceWalletId?: Maybe<Scalars['String']>;
  sourceWallet?: Maybe<Wallet>;
  destinationWalletId?: Maybe<Scalars['String']>;
  destinationWallet?: Maybe<Wallet>;
  amount: Scalars['Float'];
  fine?: Maybe<Scalars['Float']>;
  date: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  meta?: Maybe<Scalars['JSON']>;
  isImported: Scalars['Boolean'];
  isNecessary: Scalars['Boolean'];
  createdAt: Scalars['Int'];
};

export enum TransactionType {
  Income = 'income',
  Outcome = 'outcome',
  Transfer = 'transfer'
}

export type GetTransaction = {
  __typename?: 'GetTransaction';
  totalCount: Scalars['Float'];
  items: Array<Transaction>;
};

export type Goal = {
  __typename?: 'Goal';
  id: Scalars['ID'];
  goal: Scalars['Float'];
  progress: Scalars['Float'];
  progressPercent: Scalars['Float'];
  name: Scalars['String'];
  pockets: Array<Pocket>;
  currencyId: Scalars['String'];
  currency: Currency;
  syncAt: Scalars['Int'];
  createdAt: Scalars['Int'];
};

export type GoalSaveResponse = {
  __typename?: 'GoalSaveResponse';
  goal: Goal;
  wallet: Wallet;
};

export type Login = {
  __typename?: 'Login';
  accessToken: Scalars['ID'];
  refreshToken: Scalars['String'];
  profile: User;
};

export type Refresh = {
  __typename?: 'Refresh';
  accessToken: Scalars['ID'];
  refreshToken: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  connectors: Array<BankConnection>;
  currencies: Array<Currency>;
  currency: Currency;
  exchange: Scalars['Float'];
  statisticByPeriod: Array<StatisticByPeriod>;
  /** Statistic grouped by categories */
  statisticByCategory: Array<StatisticByCategory>;
  statisticByCurrency: Array<StatisticByCurrency>;
  profile: User;
  budgets: Array<Budget>;
  activeBudget: Budget;
  categories: Array<Category>;
  category: Category;
  export: Scalars['String'];
  transactions: GetTransaction;
  transaction: Transaction;
  wallets: Array<Wallet>;
  wallet: Wallet;
  goals: Array<Goal>;
  goal: Array<Goal>;
};


export type QueryCurrencyArgs = {
  id: Scalars['String'];
};


export type QueryExchangeArgs = {
  to: Scalars['String'];
  from: Scalars['String'];
  amount: Scalars['Float'];
};


export type QueryStatisticByPeriodArgs = {
  to?: Maybe<Scalars['Float']>;
  from?: Maybe<Scalars['Float']>;
  type?: Maybe<TransactionType>;
  currencyName?: Maybe<Scalars['String']>;
  walletIds?: Maybe<Array<Scalars['String']>>;
  interval?: Maybe<Scalars['String']>;
};


export type QueryStatisticByCategoryArgs = {
  to?: Maybe<Scalars['Float']>;
  from?: Maybe<Scalars['Float']>;
  type?: Maybe<TransactionType>;
  currencyName?: Maybe<Scalars['String']>;
  walletIds?: Maybe<Array<Scalars['String']>>;
};


export type QueryStatisticByCurrencyArgs = {
  walletIds?: Maybe<Array<Scalars['String']>>;
};


export type QueryCategoriesArgs = {
  type?: Maybe<Scalars['String']>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryExportArgs = {
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  amountLteFilter?: Maybe<Scalars['Float']>;
  amountGteFilter?: Maybe<Scalars['Float']>;
  search?: Maybe<Scalars['String']>;
  type?: Maybe<TransactionType>;
  to?: Maybe<Scalars['Float']>;
  from?: Maybe<Scalars['Float']>;
  currencyId?: Maybe<Scalars['String']>;
  categoryIds?: Maybe<Array<Scalars['String']>>;
  walletIds?: Maybe<Array<Scalars['String']>>;
};


export type QueryTransactionsArgs = {
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  amountLteFilter?: Maybe<Scalars['Float']>;
  amountGteFilter?: Maybe<Scalars['Float']>;
  search?: Maybe<Scalars['String']>;
  offset?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
  type?: Maybe<TransactionType>;
  to?: Maybe<Scalars['Float']>;
  from?: Maybe<Scalars['Float']>;
  currencyId?: Maybe<Scalars['String']>;
  categoryIds?: Maybe<Array<Scalars['String']>>;
  walletIds?: Maybe<Array<Scalars['String']>>;
};


export type QueryTransactionArgs = {
  id: Scalars['String'];
};


export type QueryWalletArgs = {
  id: Scalars['String'];
};


export type QueryGoalArgs = {
  id: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  import: Scalars['String'];
  addConnector: Scalars['String'];
  removeConnector: Scalars['String'];
  connectMonobank: Scalars['String'];
  disconnectMonobank: Scalars['String'];
  connectPrivat24: Scalars['String'];
  disconnectPrivat24: Scalars['String'];
  generateHistory: Scalars['String'];
  updateProfile: User;
  budgetAddOutcomeCategory: Budget;
  budgetRemoveOutcomeCategory: Budget;
  budgetAddIncomeCategory: Budget;
  budgetRemoveIncomeCategory: Budget;
  createTransaction: Transaction;
  updateTransaction: Transaction;
  createWallet: Wallet;
  updateWallet: Wallet;
  deleteWallet: Wallet;
  createGoal: Goal;
  updateGoal: Goal;
  deleteGoal: Goal;
  saveToGoal: GoalSaveResponse;
  login: Login;
  register: User;
  refresh: Refresh;
};


export type MutationImportArgs = {
  id: Scalars['String'];
};


export type MutationAddConnectorArgs = {
  args: AddConnectorArgs;
};


export type MutationRemoveConnectorArgs = {
  id: Scalars['Float'];
};


export type MutationConnectMonobankArgs = {
  token: Scalars['String'];
  description: Scalars['String'];
};


export type MutationDisconnectMonobankArgs = {
  token: Scalars['String'];
};


export type MutationConnectPrivat24Args = {
  password: Scalars['String'];
  merchant_id: Scalars['String'];
  description: Scalars['String'];
};


export type MutationDisconnectPrivat24Args = {
  merchant_id: Scalars['String'];
};


export type MutationGenerateHistoryArgs = {
  clearOldHistory: Scalars['Boolean'];
  walletId: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  profileUpdateData: UserUpdate;
};


export type MutationBudgetAddOutcomeCategoryArgs = {
  categoryData: BudgetCategoryCreate;
};


export type MutationBudgetRemoveOutcomeCategoryArgs = {
  categoryId: Scalars['String'];
};


export type MutationBudgetAddIncomeCategoryArgs = {
  categoryData: BudgetCategoryCreate;
};


export type MutationBudgetRemoveIncomeCategoryArgs = {
  categoryId: Scalars['String'];
};


export type MutationCreateTransactionArgs = {
  transactionCreateData: TransactionCreate;
};


export type MutationUpdateTransactionArgs = {
  transactionUpdateData: TransactionUpdate;
};


export type MutationCreateWalletArgs = {
  walletCreateData: WalletCreate;
};


export type MutationUpdateWalletArgs = {
  walletUpdateData: WalletUpdate;
};


export type MutationDeleteWalletArgs = {
  id: Scalars['String'];
};


export type MutationCreateGoalArgs = {
  createGoalData: GoalCreate;
};


export type MutationUpdateGoalArgs = {
  updateGoalData: GoalUpdate;
};


export type MutationDeleteGoalArgs = {
  id: Scalars['String'];
};


export type MutationSaveToGoalArgs = {
  saveGoalData: GoalSave;
};


export type MutationLoginArgs = {
  loginData: LoginInput;
};


export type MutationRegisterArgs = {
  registerData: RegisterInput;
};


export type MutationRefreshArgs = {
  refreshData: RefreshInput;
};

export type AddConnectorArgs = {
  interval: Scalars['Float'];
  enabled: Scalars['Boolean'];
  params: Scalars['JSON'];
  type: Scalars['String'];
  description: Scalars['String'];
};

export type UserUpdate = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  middleName?: Maybe<Scalars['String']>;
  additional?: Maybe<Scalars['JSON']>;
};

export type BudgetCategoryCreate = {
  categoryId: Scalars['String'];
  amount: Scalars['Float'];
  progress: Scalars['Float'];
};

export type TransactionCreate = {
  id?: Maybe<Scalars['String']>;
  categoryId: Scalars['String'];
  currencyId: Scalars['String'];
  sourceWalletId?: Maybe<Scalars['String']>;
  destinationWalletId?: Maybe<Scalars['String']>;
  fine?: Maybe<Scalars['Float']>;
  amount: Scalars['Float'];
  date: Scalars['Int'];
  type: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isNecessary?: Maybe<Scalars['Boolean']>;
  isTemplate?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['Int']>;
};

export type TransactionUpdate = {
  id: Scalars['String'];
  categoryId?: Maybe<Scalars['String']>;
  currencyId?: Maybe<Scalars['String']>;
  sourceWalletId?: Maybe<Scalars['String']>;
  destinationWalletId?: Maybe<Scalars['String']>;
  fine?: Maybe<Scalars['Float']>;
  date: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  isNecessary?: Maybe<Scalars['Boolean']>;
  isTemplate?: Maybe<Scalars['Boolean']>;
  updatedAt?: Maybe<Scalars['Int']>;
  deletedAt?: Maybe<Scalars['Int']>;
};

export type WalletCreate = {
  id?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  allowNegativeBalance?: Maybe<Scalars['Boolean']>;
  pockets?: Maybe<Array<PocketInput>>;
  createdAt?: Maybe<Scalars['Int']>;
};

export type PocketInput = {
  currencyId: Scalars['String'];
  amount: Scalars['Float'];
};

export type WalletUpdate = {
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  allowNegativeBalance: Scalars['Boolean'];
  pockets?: Maybe<Array<PocketInput>>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type GoalCreate = {
  goal: Scalars['Float'];
  progress?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  pockets?: Maybe<Array<PocketInput>>;
  currencyId: Scalars['String'];
  createdAt?: Maybe<Scalars['Int']>;
};

export type GoalUpdate = {
  id: Scalars['ID'];
  goal?: Maybe<Scalars['Float']>;
  currencyId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  pockets?: Maybe<Array<PocketInput>>;
  updatedAt?: Maybe<Scalars['Int']>;
};

export type GoalSave = {
  toGoalId: Scalars['String'];
  fromWalletId: Scalars['String'];
  currencyId: Scalars['String'];
  amount: Scalars['Float'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  additional?: Maybe<Scalars['JSON']>;
  password: Scalars['String'];
};

export type RefreshInput = {
  refreshToken: Scalars['String'];
};

export type AddConnectorMutationVariables = Exact<{
  type: Scalars['String'];
  description: Scalars['String'];
  interval: Scalars['Float'];
  params: Scalars['JSON'];
  enabled: Scalars['Boolean'];
}>;


export type AddConnectorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addConnector'>
);

export type AddWalletMutationVariables = Exact<{
  walletCreateData: WalletCreate;
}>;


export type AddWalletMutation = (
  { __typename?: 'Mutation' }
  & { createWallet: (
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'name' | 'type' | 'description'>
    & { pockets: Array<(
      { __typename?: 'Pocket' }
      & Pick<Pocket, 'amount'>
      & { currency: (
        { __typename?: 'Currency' }
        & Pick<Currency, 'id' | 'name' | 'symbol'>
      ) }
    )> }
  ) }
);

export type AnalysByCategoriesQueryVariables = Exact<{
  from?: Maybe<Scalars['Float']>;
  to?: Maybe<Scalars['Float']>;
  currencyName?: Maybe<Scalars['String']>;
  walletIds?: Maybe<Array<Scalars['String']>>;
  type?: Maybe<TransactionType>;
}>;


export type AnalysByCategoriesQuery = (
  { __typename?: 'Query' }
  & { statisticByCategory: Array<(
    { __typename?: 'StatisticByCategory' }
    & Pick<StatisticByCategory, 'amount'>
    & { category: (
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'name' | 'type'>
      & { icon?: Maybe<(
        { __typename?: 'IconDto' }
        & Pick<IconDto, 'name' | 'type' | 'backgroundColor' | 'color'>
      )> }
    ) }
  )>, wallets: Array<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'name' | 'description'>
  )> }
);

export type GetStatisticByCurrencyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatisticByCurrencyQuery = (
  { __typename?: 'Query' }
  & { statisticByCurrency: Array<(
    { __typename?: 'StatisticByCurrency' }
    & Pick<StatisticByCurrency, 'amount'>
    & { currency: (
      { __typename?: 'Currency' }
      & Pick<Currency, 'id' | 'name' | 'description' | 'symbol'>
    ) }
  )> }
);

export type GetStatisticByPeriodQueryVariables = Exact<{
  from?: Maybe<Scalars['Float']>;
  to?: Maybe<Scalars['Float']>;
}>;


export type GetStatisticByPeriodQuery = (
  { __typename?: 'Query' }
  & { statisticByPeriod: Array<(
    { __typename?: 'StatisticByPeriod' }
    & Pick<StatisticByPeriod, 'walletId' | 'createdAt'>
    & { wallet: (
      { __typename?: 'Wallet' }
      & Pick<Wallet, 'id' | 'name' | 'description'>
    ), pockets: Array<(
      { __typename?: 'Pocket' }
      & Pick<Pocket, 'amount'>
      & { currency: (
        { __typename?: 'Currency' }
        & Pick<Currency, 'id' | 'name'>
      ) }
    )> }
  )> }
);

export type IconFragment = (
  { __typename?: 'IconDto' }
  & Pick<IconDto, 'type' | 'name' | 'color' | 'backgroundColor'>
);

export type BudgetCategoryFragment = (
  { __typename?: 'BudgetCategory' }
  & Pick<BudgetCategory, 'amount' | 'progress'>
  & { category: (
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name'>
    & { icon?: Maybe<(
      { __typename?: 'IconDto' }
      & IconFragment
    )> }
  ) }
);

export type BudgetFragment = (
  { __typename?: 'Budget' }
  & Pick<Budget, 'id' | 'date' | 'deadline'>
  & { incomes: Array<(
    { __typename?: 'BudgetCategory' }
    & BudgetCategoryFragment
  )>, outcomes: Array<(
    { __typename?: 'BudgetCategory' }
    & BudgetCategoryFragment
  )> }
);

export type GetActiveBudgetQueryVariables = Exact<{ [key: string]: never; }>;


export type GetActiveBudgetQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'type'>
    & { icon?: Maybe<(
      { __typename?: 'IconDto' }
      & IconFragment
    )> }
  )>, activeBudget: (
    { __typename?: 'Budget' }
    & BudgetFragment
  ) }
);

export type AddOutcomeBudgetMutationVariables = Exact<{
  categoryId: Scalars['String'];
  amount: Scalars['Float'];
  progress?: Maybe<Scalars['Float']>;
}>;


export type AddOutcomeBudgetMutation = (
  { __typename?: 'Mutation' }
  & { budgetAddOutcomeCategory: (
    { __typename?: 'Budget' }
    & BudgetFragment
  ) }
);

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = (
  { __typename?: 'Query' }
  & { categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'type'>
    & { icon?: Maybe<(
      { __typename?: 'IconDto' }
      & Pick<IconDto, 'type' | 'name' | 'backgroundColor' | 'color'>
    )> }
  )> }
);

export type GetConnectorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConnectorsQuery = (
  { __typename?: 'Query' }
  & { connectors: Array<(
    { __typename?: 'BankConnection' }
    & Pick<BankConnection, 'id' | 'description' | 'type' | 'meta' | 'enabled' | 'createdAt'>
  )> }
);

export type GetCurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrenciesQuery = (
  { __typename?: 'Query' }
  & { currencies: Array<(
    { __typename?: 'Currency' }
    & Pick<Currency, 'id' | 'name' | 'description' | 'symbol' | 'code' | 'rate'>
  )> }
);

export type DeleteWalletMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteWalletMutation = (
  { __typename?: 'Mutation' }
  & { deleteWallet: (
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id'>
  ) }
);

export type GetFilterGroupQueryVariables = Exact<{
  type?: Maybe<Scalars['String']>;
}>;


export type GetFilterGroupQuery = (
  { __typename?: 'Query' }
  & { wallets: Array<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'name' | 'description'>
  )>, currencies: Array<(
    { __typename?: 'Currency' }
    & Pick<Currency, 'id' | 'name' | 'description' | 'symbol'>
  )>, categories: Array<(
    { __typename?: 'Category' }
    & Pick<Category, 'id' | 'name' | 'type'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'Login' }
    & Pick<Login, 'accessToken' | 'refreshToken'>
  ) }
);

export type GetProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProfileQuery = (
  { __typename?: 'Query' }
  & { profile: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'middleName' | 'email' | 'imageUrl' | 'additional'>
  ) }
);

export type RefreshMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type RefreshMutation = (
  { __typename?: 'Mutation' }
  & { refresh: (
    { __typename?: 'Refresh' }
    & Pick<Refresh, 'accessToken' | 'refreshToken'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  middleName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  additional?: Maybe<Scalars['JSON']>;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type WalletFragment = (
  { __typename?: 'Wallet' }
  & Pick<Wallet, 'id' | 'name' | 'type' | 'description'>
);

export type TransactionFragment = (
  { __typename?: 'Transaction' }
  & Pick<Transaction, 'id' | 'type' | 'date' | 'description' | 'amount'>
  & { currency: (
    { __typename?: 'Currency' }
    & Pick<Currency, 'id' | 'name' | 'description' | 'symbol'>
  ), category: (
    { __typename?: 'Category' }
    & Pick<Category, 'name' | 'type'>
    & { icon?: Maybe<(
      { __typename?: 'IconDto' }
      & Pick<IconDto, 'type' | 'name' | 'backgroundColor' | 'color'>
    )> }
  ) }
);

export type GetTransactionQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetTransactionQuery = (
  { __typename?: 'Query' }
  & { transaction: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'meta'>
    & { sourceWallet?: Maybe<(
      { __typename?: 'Wallet' }
      & WalletFragment
    )>, destinationWallet?: Maybe<(
      { __typename?: 'Wallet' }
      & WalletFragment
    )> }
    & TransactionFragment
  ) }
);

export type ExportQueryVariables = Exact<{
  type?: Maybe<TransactionType>;
  from?: Maybe<Scalars['Float']>;
  to?: Maybe<Scalars['Float']>;
  walletIds?: Maybe<Array<Scalars['String']>>;
  categoryIds?: Maybe<Array<Scalars['String']>>;
  search?: Maybe<Scalars['String']>;
  amountGte?: Maybe<Scalars['Float']>;
  amountLte?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
}>;


export type ExportQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'export'>
);

export type GetTransactionsQueryVariables = Exact<{
  type?: Maybe<TransactionType>;
  from?: Maybe<Scalars['Float']>;
  to?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
  walletIds?: Maybe<Array<Scalars['String']>>;
  categoryIds?: Maybe<Array<Scalars['String']>>;
  search?: Maybe<Scalars['String']>;
  amountGte?: Maybe<Scalars['Float']>;
  amountLte?: Maybe<Scalars['Float']>;
  order?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
}>;


export type GetTransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: (
    { __typename?: 'GetTransaction' }
    & Pick<GetTransaction, 'totalCount'>
    & { items: Array<(
      { __typename?: 'Transaction' }
      & { sourceWallet?: Maybe<(
        { __typename?: 'Wallet' }
        & WalletFragment
      )>, destinationWallet?: Maybe<(
        { __typename?: 'Wallet' }
        & WalletFragment
      )> }
      & TransactionFragment
    )> }
  ) }
);

export type GetWalletTransactionsQueryVariables = Exact<{
  type?: Maybe<TransactionType>;
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
  walletId: Scalars['String'];
}>;


export type GetWalletTransactionsQuery = (
  { __typename?: 'Query' }
  & { wallet: (
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'name' | 'description'>
  ), transactions: (
    { __typename?: 'GetTransaction' }
    & Pick<GetTransaction, 'totalCount'>
    & { items: Array<(
      { __typename?: 'Transaction' }
      & TransactionFragment
    )> }
  ) }
);

export type UpdateWalletMutationVariables = Exact<{
  walletUpdateData: WalletUpdate;
}>;


export type UpdateWalletMutation = (
  { __typename?: 'Mutation' }
  & { updateWallet: (
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'name' | 'type' | 'description'>
    & { pockets: Array<(
      { __typename?: 'Pocket' }
      & Pick<Pocket, 'amount'>
      & { currency: (
        { __typename?: 'Currency' }
        & Pick<Currency, 'id' | 'name' | 'symbol'>
      ) }
    )> }
  ) }
);

export type GetWalletsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWalletsQuery = (
  { __typename?: 'Query' }
  & { wallets: Array<(
    { __typename?: 'Wallet' }
    & Pick<Wallet, 'id' | 'name' | 'type' | 'description'>
    & { pockets: Array<(
      { __typename?: 'Pocket' }
      & Pick<Pocket, 'amount'>
      & { currency: (
        { __typename?: 'Currency' }
        & Pick<Currency, 'id' | 'name' | 'symbol'>
      ) }
    )> }
  )> }
);

export const IconFragmentDoc = gql`
    fragment icon on IconDto {
  type
  name
  color
  backgroundColor
}
    `;
export const BudgetCategoryFragmentDoc = gql`
    fragment budgetCategory on BudgetCategory {
  category {
    id
    name
    icon {
      ...icon
    }
  }
  amount
  progress
}
    ${IconFragmentDoc}`;
export const BudgetFragmentDoc = gql`
    fragment budget on Budget {
  id
  incomes {
    ...budgetCategory
  }
  outcomes {
    ...budgetCategory
  }
  date
  deadline
}
    ${BudgetCategoryFragmentDoc}`;
export const WalletFragmentDoc = gql`
    fragment wallet on Wallet {
  id
  name
  type
  description
}
    `;
export const TransactionFragmentDoc = gql`
    fragment transaction on Transaction {
  id
  type
  currency {
    id
    name
    description
    symbol
  }
  category {
    name
    type
    icon {
      type
      name
      backgroundColor
      color
    }
  }
  date
  description
  amount
}
    `;
export const AddConnectorDocument = gql`
    mutation addConnector($type: String!, $description: String!, $interval: Float!, $params: JSON!, $enabled: Boolean!) {
  addConnector(
    args: {type: $type, description: $description, interval: $interval, params: $params, enabled: $enabled}
  )
}
    `;
export type AddConnectorMutationFn = Apollo.MutationFunction<AddConnectorMutation, AddConnectorMutationVariables>;

/**
 * __useAddConnectorMutation__
 *
 * To run a mutation, you first call `useAddConnectorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddConnectorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addConnectorMutation, { data, loading, error }] = useAddConnectorMutation({
 *   variables: {
 *      type: // value for 'type'
 *      description: // value for 'description'
 *      interval: // value for 'interval'
 *      params: // value for 'params'
 *      enabled: // value for 'enabled'
 *   },
 * });
 */
export function useAddConnectorMutation(baseOptions?: Apollo.MutationHookOptions<AddConnectorMutation, AddConnectorMutationVariables>) {
        return Apollo.useMutation<AddConnectorMutation, AddConnectorMutationVariables>(AddConnectorDocument, baseOptions);
      }
export type AddConnectorMutationHookResult = ReturnType<typeof useAddConnectorMutation>;
export type AddConnectorMutationResult = Apollo.MutationResult<AddConnectorMutation>;
export type AddConnectorMutationOptions = Apollo.BaseMutationOptions<AddConnectorMutation, AddConnectorMutationVariables>;
export const AddWalletDocument = gql`
    mutation AddWallet($walletCreateData: WalletCreate!) {
  createWallet(walletCreateData: $walletCreateData) {
    id
    name
    type
    description
    pockets {
      amount
      currency {
        id
        name
        symbol
      }
    }
  }
}
    `;
export type AddWalletMutationFn = Apollo.MutationFunction<AddWalletMutation, AddWalletMutationVariables>;

/**
 * __useAddWalletMutation__
 *
 * To run a mutation, you first call `useAddWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWalletMutation, { data, loading, error }] = useAddWalletMutation({
 *   variables: {
 *      walletCreateData: // value for 'walletCreateData'
 *   },
 * });
 */
export function useAddWalletMutation(baseOptions?: Apollo.MutationHookOptions<AddWalletMutation, AddWalletMutationVariables>) {
        return Apollo.useMutation<AddWalletMutation, AddWalletMutationVariables>(AddWalletDocument, baseOptions);
      }
export type AddWalletMutationHookResult = ReturnType<typeof useAddWalletMutation>;
export type AddWalletMutationResult = Apollo.MutationResult<AddWalletMutation>;
export type AddWalletMutationOptions = Apollo.BaseMutationOptions<AddWalletMutation, AddWalletMutationVariables>;
export const AnalysByCategoriesDocument = gql`
    query AnalysByCategories($from: Float, $to: Float, $currencyName: String, $walletIds: [String!], $type: TransactionType) {
  statisticByCategory(
    from: $from
    to: $to
    currencyName: $currencyName
    walletIds: $walletIds
    type: $type
  ) {
    amount
    category {
      id
      name
      type
      icon {
        name
        type
        backgroundColor
        color
      }
    }
  }
  wallets {
    id
    name
    description
  }
}
    `;

/**
 * __useAnalysByCategoriesQuery__
 *
 * To run a query within a React component, call `useAnalysByCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalysByCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalysByCategoriesQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      currencyName: // value for 'currencyName'
 *      walletIds: // value for 'walletIds'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAnalysByCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<AnalysByCategoriesQuery, AnalysByCategoriesQueryVariables>) {
        return Apollo.useQuery<AnalysByCategoriesQuery, AnalysByCategoriesQueryVariables>(AnalysByCategoriesDocument, baseOptions);
      }
export function useAnalysByCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnalysByCategoriesQuery, AnalysByCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<AnalysByCategoriesQuery, AnalysByCategoriesQueryVariables>(AnalysByCategoriesDocument, baseOptions);
        }
export type AnalysByCategoriesQueryHookResult = ReturnType<typeof useAnalysByCategoriesQuery>;
export type AnalysByCategoriesLazyQueryHookResult = ReturnType<typeof useAnalysByCategoriesLazyQuery>;
export type AnalysByCategoriesQueryResult = Apollo.QueryResult<AnalysByCategoriesQuery, AnalysByCategoriesQueryVariables>;
export const GetStatisticByCurrencyDocument = gql`
    query GetStatisticByCurrency {
  statisticByCurrency {
    amount
    currency {
      id
      name
      description
      symbol
    }
  }
}
    `;

/**
 * __useGetStatisticByCurrencyQuery__
 *
 * To run a query within a React component, call `useGetStatisticByCurrencyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatisticByCurrencyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatisticByCurrencyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatisticByCurrencyQuery(baseOptions?: Apollo.QueryHookOptions<GetStatisticByCurrencyQuery, GetStatisticByCurrencyQueryVariables>) {
        return Apollo.useQuery<GetStatisticByCurrencyQuery, GetStatisticByCurrencyQueryVariables>(GetStatisticByCurrencyDocument, baseOptions);
      }
export function useGetStatisticByCurrencyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatisticByCurrencyQuery, GetStatisticByCurrencyQueryVariables>) {
          return Apollo.useLazyQuery<GetStatisticByCurrencyQuery, GetStatisticByCurrencyQueryVariables>(GetStatisticByCurrencyDocument, baseOptions);
        }
export type GetStatisticByCurrencyQueryHookResult = ReturnType<typeof useGetStatisticByCurrencyQuery>;
export type GetStatisticByCurrencyLazyQueryHookResult = ReturnType<typeof useGetStatisticByCurrencyLazyQuery>;
export type GetStatisticByCurrencyQueryResult = Apollo.QueryResult<GetStatisticByCurrencyQuery, GetStatisticByCurrencyQueryVariables>;
export const GetStatisticByPeriodDocument = gql`
    query GetStatisticByPeriod($from: Float, $to: Float) {
  statisticByPeriod(from: $from, to: $to) {
    walletId
    wallet {
      id
      name
      description
    }
    pockets {
      amount
      currency {
        id
        name
      }
    }
    createdAt
  }
}
    `;

/**
 * __useGetStatisticByPeriodQuery__
 *
 * To run a query within a React component, call `useGetStatisticByPeriodQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatisticByPeriodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatisticByPeriodQuery({
 *   variables: {
 *      from: // value for 'from'
 *      to: // value for 'to'
 *   },
 * });
 */
export function useGetStatisticByPeriodQuery(baseOptions?: Apollo.QueryHookOptions<GetStatisticByPeriodQuery, GetStatisticByPeriodQueryVariables>) {
        return Apollo.useQuery<GetStatisticByPeriodQuery, GetStatisticByPeriodQueryVariables>(GetStatisticByPeriodDocument, baseOptions);
      }
export function useGetStatisticByPeriodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatisticByPeriodQuery, GetStatisticByPeriodQueryVariables>) {
          return Apollo.useLazyQuery<GetStatisticByPeriodQuery, GetStatisticByPeriodQueryVariables>(GetStatisticByPeriodDocument, baseOptions);
        }
export type GetStatisticByPeriodQueryHookResult = ReturnType<typeof useGetStatisticByPeriodQuery>;
export type GetStatisticByPeriodLazyQueryHookResult = ReturnType<typeof useGetStatisticByPeriodLazyQuery>;
export type GetStatisticByPeriodQueryResult = Apollo.QueryResult<GetStatisticByPeriodQuery, GetStatisticByPeriodQueryVariables>;
export const GetActiveBudgetDocument = gql`
    query getActiveBudget {
  categories {
    id
    name
    type
    icon {
      ...icon
    }
  }
  activeBudget {
    ...budget
  }
}
    ${IconFragmentDoc}
${BudgetFragmentDoc}`;

/**
 * __useGetActiveBudgetQuery__
 *
 * To run a query within a React component, call `useGetActiveBudgetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetActiveBudgetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetActiveBudgetQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetActiveBudgetQuery(baseOptions?: Apollo.QueryHookOptions<GetActiveBudgetQuery, GetActiveBudgetQueryVariables>) {
        return Apollo.useQuery<GetActiveBudgetQuery, GetActiveBudgetQueryVariables>(GetActiveBudgetDocument, baseOptions);
      }
export function useGetActiveBudgetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetActiveBudgetQuery, GetActiveBudgetQueryVariables>) {
          return Apollo.useLazyQuery<GetActiveBudgetQuery, GetActiveBudgetQueryVariables>(GetActiveBudgetDocument, baseOptions);
        }
export type GetActiveBudgetQueryHookResult = ReturnType<typeof useGetActiveBudgetQuery>;
export type GetActiveBudgetLazyQueryHookResult = ReturnType<typeof useGetActiveBudgetLazyQuery>;
export type GetActiveBudgetQueryResult = Apollo.QueryResult<GetActiveBudgetQuery, GetActiveBudgetQueryVariables>;
export const AddOutcomeBudgetDocument = gql`
    mutation addOutcomeBudget($categoryId: String!, $amount: Float!, $progress: Float = 0) {
  budgetAddOutcomeCategory(
    categoryData: {categoryId: $categoryId, amount: $amount, progress: $progress}
  ) {
    ...budget
  }
}
    ${BudgetFragmentDoc}`;
export type AddOutcomeBudgetMutationFn = Apollo.MutationFunction<AddOutcomeBudgetMutation, AddOutcomeBudgetMutationVariables>;

/**
 * __useAddOutcomeBudgetMutation__
 *
 * To run a mutation, you first call `useAddOutcomeBudgetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOutcomeBudgetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOutcomeBudgetMutation, { data, loading, error }] = useAddOutcomeBudgetMutation({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      amount: // value for 'amount'
 *      progress: // value for 'progress'
 *   },
 * });
 */
export function useAddOutcomeBudgetMutation(baseOptions?: Apollo.MutationHookOptions<AddOutcomeBudgetMutation, AddOutcomeBudgetMutationVariables>) {
        return Apollo.useMutation<AddOutcomeBudgetMutation, AddOutcomeBudgetMutationVariables>(AddOutcomeBudgetDocument, baseOptions);
      }
export type AddOutcomeBudgetMutationHookResult = ReturnType<typeof useAddOutcomeBudgetMutation>;
export type AddOutcomeBudgetMutationResult = Apollo.MutationResult<AddOutcomeBudgetMutation>;
export type AddOutcomeBudgetMutationOptions = Apollo.BaseMutationOptions<AddOutcomeBudgetMutation, AddOutcomeBudgetMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    id
    name
    type
    icon {
      type
      name
      backgroundColor
      color
    }
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, baseOptions);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetConnectorsDocument = gql`
    query GetConnectors {
  connectors {
    id
    description
    type
    meta
    enabled
    createdAt
  }
}
    `;

/**
 * __useGetConnectorsQuery__
 *
 * To run a query within a React component, call `useGetConnectorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConnectorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConnectorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConnectorsQuery(baseOptions?: Apollo.QueryHookOptions<GetConnectorsQuery, GetConnectorsQueryVariables>) {
        return Apollo.useQuery<GetConnectorsQuery, GetConnectorsQueryVariables>(GetConnectorsDocument, baseOptions);
      }
export function useGetConnectorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConnectorsQuery, GetConnectorsQueryVariables>) {
          return Apollo.useLazyQuery<GetConnectorsQuery, GetConnectorsQueryVariables>(GetConnectorsDocument, baseOptions);
        }
export type GetConnectorsQueryHookResult = ReturnType<typeof useGetConnectorsQuery>;
export type GetConnectorsLazyQueryHookResult = ReturnType<typeof useGetConnectorsLazyQuery>;
export type GetConnectorsQueryResult = Apollo.QueryResult<GetConnectorsQuery, GetConnectorsQueryVariables>;
export const GetCurrenciesDocument = gql`
    query GetCurrencies {
  currencies {
    id
    name
    description
    symbol
    code
    rate
  }
}
    `;

/**
 * __useGetCurrenciesQuery__
 *
 * To run a query within a React component, call `useGetCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrenciesQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrenciesQuery, GetCurrenciesQueryVariables>) {
        return Apollo.useQuery<GetCurrenciesQuery, GetCurrenciesQueryVariables>(GetCurrenciesDocument, baseOptions);
      }
export function useGetCurrenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrenciesQuery, GetCurrenciesQueryVariables>) {
          return Apollo.useLazyQuery<GetCurrenciesQuery, GetCurrenciesQueryVariables>(GetCurrenciesDocument, baseOptions);
        }
export type GetCurrenciesQueryHookResult = ReturnType<typeof useGetCurrenciesQuery>;
export type GetCurrenciesLazyQueryHookResult = ReturnType<typeof useGetCurrenciesLazyQuery>;
export type GetCurrenciesQueryResult = Apollo.QueryResult<GetCurrenciesQuery, GetCurrenciesQueryVariables>;
export const DeleteWalletDocument = gql`
    mutation deleteWallet($id: String!) {
  deleteWallet(id: $id) {
    id
  }
}
    `;
export type DeleteWalletMutationFn = Apollo.MutationFunction<DeleteWalletMutation, DeleteWalletMutationVariables>;

/**
 * __useDeleteWalletMutation__
 *
 * To run a mutation, you first call `useDeleteWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWalletMutation, { data, loading, error }] = useDeleteWalletMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWalletMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWalletMutation, DeleteWalletMutationVariables>) {
        return Apollo.useMutation<DeleteWalletMutation, DeleteWalletMutationVariables>(DeleteWalletDocument, baseOptions);
      }
export type DeleteWalletMutationHookResult = ReturnType<typeof useDeleteWalletMutation>;
export type DeleteWalletMutationResult = Apollo.MutationResult<DeleteWalletMutation>;
export type DeleteWalletMutationOptions = Apollo.BaseMutationOptions<DeleteWalletMutation, DeleteWalletMutationVariables>;
export const GetFilterGroupDocument = gql`
    query getFilterGroup($type: String = "income") {
  wallets {
    id
    name
    description
  }
  currencies {
    id
    name
    description
    symbol
  }
  categories(type: $type) {
    id
    name
    type
  }
}
    `;

/**
 * __useGetFilterGroupQuery__
 *
 * To run a query within a React component, call `useGetFilterGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilterGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilterGroupQuery({
 *   variables: {
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetFilterGroupQuery(baseOptions?: Apollo.QueryHookOptions<GetFilterGroupQuery, GetFilterGroupQueryVariables>) {
        return Apollo.useQuery<GetFilterGroupQuery, GetFilterGroupQueryVariables>(GetFilterGroupDocument, baseOptions);
      }
export function useGetFilterGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilterGroupQuery, GetFilterGroupQueryVariables>) {
          return Apollo.useLazyQuery<GetFilterGroupQuery, GetFilterGroupQueryVariables>(GetFilterGroupDocument, baseOptions);
        }
export type GetFilterGroupQueryHookResult = ReturnType<typeof useGetFilterGroupQuery>;
export type GetFilterGroupLazyQueryHookResult = ReturnType<typeof useGetFilterGroupLazyQuery>;
export type GetFilterGroupQueryResult = Apollo.QueryResult<GetFilterGroupQuery, GetFilterGroupQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(loginData: {email: $email, password: $password}) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetProfileDocument = gql`
    query GetProfile {
  profile {
    id
    firstName
    lastName
    middleName
    email
    imageUrl
    additional
  }
}
    `;

/**
 * __useGetProfileQuery__
 *
 * To run a query within a React component, call `useGetProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProfileQuery(baseOptions?: Apollo.QueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
        return Apollo.useQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
      }
export function useGetProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProfileQuery, GetProfileQueryVariables>) {
          return Apollo.useLazyQuery<GetProfileQuery, GetProfileQueryVariables>(GetProfileDocument, baseOptions);
        }
export type GetProfileQueryHookResult = ReturnType<typeof useGetProfileQuery>;
export type GetProfileLazyQueryHookResult = ReturnType<typeof useGetProfileLazyQuery>;
export type GetProfileQueryResult = Apollo.QueryResult<GetProfileQuery, GetProfileQueryVariables>;
export const RefreshDocument = gql`
    mutation Refresh($token: String!) {
  refresh(refreshData: {refreshToken: $token}) {
    accessToken
    refreshToken
  }
}
    `;
export type RefreshMutationFn = Apollo.MutationFunction<RefreshMutation, RefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: Apollo.MutationHookOptions<RefreshMutation, RefreshMutationVariables>) {
        return Apollo.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument, baseOptions);
      }
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<RefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<RefreshMutation, RefreshMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String!, $middleName: String, $lastName: String, $imageUrl: String, $additional: JSON) {
  register(
    registerData: {email: $email, password: $password, firstName: $firstName, middleName: $middleName, lastName: $lastName, imageUrl: $imageUrl, additional: $additional}
  ) {
    id
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      middleName: // value for 'middleName'
 *      lastName: // value for 'lastName'
 *      imageUrl: // value for 'imageUrl'
 *      additional: // value for 'additional'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const GetTransactionDocument = gql`
    query getTransaction($id: String!) {
  transaction(id: $id) {
    ...transaction
    sourceWallet {
      ...wallet
    }
    destinationWallet {
      ...wallet
    }
    meta
  }
}
    ${TransactionFragmentDoc}
${WalletFragmentDoc}`;

/**
 * __useGetTransactionQuery__
 *
 * To run a query within a React component, call `useGetTransactionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTransactionQuery(baseOptions: Apollo.QueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
        return Apollo.useQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, baseOptions);
      }
export function useGetTransactionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionQuery, GetTransactionQueryVariables>) {
          return Apollo.useLazyQuery<GetTransactionQuery, GetTransactionQueryVariables>(GetTransactionDocument, baseOptions);
        }
export type GetTransactionQueryHookResult = ReturnType<typeof useGetTransactionQuery>;
export type GetTransactionLazyQueryHookResult = ReturnType<typeof useGetTransactionLazyQuery>;
export type GetTransactionQueryResult = Apollo.QueryResult<GetTransactionQuery, GetTransactionQueryVariables>;
export const ExportDocument = gql`
    query export($type: TransactionType, $from: Float, $to: Float, $walletIds: [String!], $categoryIds: [String!], $search: String, $amountGte: Float, $amountLte: Float, $order: String, $orderBy: String) {
  export(
    type: $type
    from: $from
    to: $to
    walletIds: $walletIds
    categoryIds: $categoryIds
    search: $search
    amountGteFilter: $amountGte
    amountLteFilter: $amountLte
    orderBy: $orderBy
    order: $order
  )
}
    `;

/**
 * __useExportQuery__
 *
 * To run a query within a React component, call `useExportQuery` and pass it any options that fit your needs.
 * When your component renders, `useExportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExportQuery({
 *   variables: {
 *      type: // value for 'type'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      walletIds: // value for 'walletIds'
 *      categoryIds: // value for 'categoryIds'
 *      search: // value for 'search'
 *      amountGte: // value for 'amountGte'
 *      amountLte: // value for 'amountLte'
 *      order: // value for 'order'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useExportQuery(baseOptions?: Apollo.QueryHookOptions<ExportQuery, ExportQueryVariables>) {
        return Apollo.useQuery<ExportQuery, ExportQueryVariables>(ExportDocument, baseOptions);
      }
export function useExportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExportQuery, ExportQueryVariables>) {
          return Apollo.useLazyQuery<ExportQuery, ExportQueryVariables>(ExportDocument, baseOptions);
        }
export type ExportQueryHookResult = ReturnType<typeof useExportQuery>;
export type ExportLazyQueryHookResult = ReturnType<typeof useExportLazyQuery>;
export type ExportQueryResult = Apollo.QueryResult<ExportQuery, ExportQueryVariables>;
export const GetTransactionsDocument = gql`
    query getTransactions($type: TransactionType, $from: Float, $to: Float, $limit: Float, $offset: Float, $walletIds: [String!], $categoryIds: [String!], $search: String, $amountGte: Float, $amountLte: Float, $order: String, $orderBy: String) {
  transactions(
    type: $type
    from: $from
    to: $to
    limit: $limit
    offset: $offset
    walletIds: $walletIds
    categoryIds: $categoryIds
    search: $search
    amountGteFilter: $amountGte
    amountLteFilter: $amountLte
    orderBy: $orderBy
    order: $order
  ) {
    totalCount
    items {
      ...transaction
      sourceWallet {
        ...wallet
      }
      destinationWallet {
        ...wallet
      }
    }
  }
}
    ${TransactionFragmentDoc}
${WalletFragmentDoc}`;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a React component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactionsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      walletIds: // value for 'walletIds'
 *      categoryIds: // value for 'categoryIds'
 *      search: // value for 'search'
 *      amountGte: // value for 'amountGte'
 *      amountLte: // value for 'amountLte'
 *      order: // value for 'order'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
        return Apollo.useQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, baseOptions);
      }
export function useGetTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactionsQuery, GetTransactionsQueryVariables>) {
          return Apollo.useLazyQuery<GetTransactionsQuery, GetTransactionsQueryVariables>(GetTransactionsDocument, baseOptions);
        }
export type GetTransactionsQueryHookResult = ReturnType<typeof useGetTransactionsQuery>;
export type GetTransactionsLazyQueryHookResult = ReturnType<typeof useGetTransactionsLazyQuery>;
export type GetTransactionsQueryResult = Apollo.QueryResult<GetTransactionsQuery, GetTransactionsQueryVariables>;
export const GetWalletTransactionsDocument = gql`
    query getWalletTransactions($type: TransactionType, $limit: Float, $offset: Float, $walletId: String!) {
  wallet(id: $walletId) {
    id
    name
    description
  }
  transactions(
    type: $type
    limit: $limit
    offset: $offset
    walletIds: [$walletId]
  ) {
    totalCount
    items {
      ...transaction
    }
  }
}
    ${TransactionFragmentDoc}`;

/**
 * __useGetWalletTransactionsQuery__
 *
 * To run a query within a React component, call `useGetWalletTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletTransactionsQuery({
 *   variables: {
 *      type: // value for 'type'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      walletId: // value for 'walletId'
 *   },
 * });
 */
export function useGetWalletTransactionsQuery(baseOptions: Apollo.QueryHookOptions<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>) {
        return Apollo.useQuery<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>(GetWalletTransactionsDocument, baseOptions);
      }
export function useGetWalletTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>) {
          return Apollo.useLazyQuery<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>(GetWalletTransactionsDocument, baseOptions);
        }
export type GetWalletTransactionsQueryHookResult = ReturnType<typeof useGetWalletTransactionsQuery>;
export type GetWalletTransactionsLazyQueryHookResult = ReturnType<typeof useGetWalletTransactionsLazyQuery>;
export type GetWalletTransactionsQueryResult = Apollo.QueryResult<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>;
export const UpdateWalletDocument = gql`
    mutation UpdateWallet($walletUpdateData: WalletUpdate!) {
  updateWallet(walletUpdateData: $walletUpdateData) {
    id
    name
    type
    description
    pockets {
      amount
      currency {
        id
        name
        symbol
      }
    }
  }
}
    `;
export type UpdateWalletMutationFn = Apollo.MutationFunction<UpdateWalletMutation, UpdateWalletMutationVariables>;

/**
 * __useUpdateWalletMutation__
 *
 * To run a mutation, you first call `useUpdateWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWalletMutation, { data, loading, error }] = useUpdateWalletMutation({
 *   variables: {
 *      walletUpdateData: // value for 'walletUpdateData'
 *   },
 * });
 */
export function useUpdateWalletMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWalletMutation, UpdateWalletMutationVariables>) {
        return Apollo.useMutation<UpdateWalletMutation, UpdateWalletMutationVariables>(UpdateWalletDocument, baseOptions);
      }
export type UpdateWalletMutationHookResult = ReturnType<typeof useUpdateWalletMutation>;
export type UpdateWalletMutationResult = Apollo.MutationResult<UpdateWalletMutation>;
export type UpdateWalletMutationOptions = Apollo.BaseMutationOptions<UpdateWalletMutation, UpdateWalletMutationVariables>;
export const GetWalletsDocument = gql`
    query GetWallets {
  wallets {
    id
    name
    type
    description
    pockets {
      amount
      currency {
        id
        name
        symbol
      }
    }
  }
}
    `;

/**
 * __useGetWalletsQuery__
 *
 * To run a query within a React component, call `useGetWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWalletsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWalletsQuery(baseOptions?: Apollo.QueryHookOptions<GetWalletsQuery, GetWalletsQueryVariables>) {
        return Apollo.useQuery<GetWalletsQuery, GetWalletsQueryVariables>(GetWalletsDocument, baseOptions);
      }
export function useGetWalletsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWalletsQuery, GetWalletsQueryVariables>) {
          return Apollo.useLazyQuery<GetWalletsQuery, GetWalletsQueryVariables>(GetWalletsDocument, baseOptions);
        }
export type GetWalletsQueryHookResult = ReturnType<typeof useGetWalletsQuery>;
export type GetWalletsLazyQueryHookResult = ReturnType<typeof useGetWalletsLazyQuery>;
export type GetWalletsQueryResult = Apollo.QueryResult<GetWalletsQuery, GetWalletsQueryVariables>;