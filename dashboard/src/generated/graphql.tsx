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
  date: Scalars['DateTime'];
  deadline: Scalars['DateTime'];
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

/** Statistic info about transactions */
export type StatisticByCurrency = {
  __typename?: 'StatisticByCurrency';
  currencyId: Scalars['String'];
  currency: Currency;
  amount: Scalars['Float'];
};

/** Statistic info about transactions */
export type StatisticByCategory = {
  __typename?: 'StatisticByCategory';
  categoryId: Scalars['String'];
  category: Category;
  amount: Scalars['Float'];
};

/** Statistic info about transactions */
export type StatisticByPeriod = {
  __typename?: 'StatisticByPeriod';
  date: Scalars['String'];
  amount: Scalars['Float'];
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
  profile: User;
  budgets: Array<Budget>;
  activeBudget: Budget;
  categories: Array<Category>;
  category: Category;
  currencies: Array<Currency>;
  currency: Currency;
  exchange: Scalars['Float'];
  transactions: GetTransaction;
  transaction: Transaction;
  wallets: Array<Wallet>;
  wallet: Wallet;
  goals: Array<Goal>;
  goal: Array<Goal>;
  statisticByPeriod: Array<StatisticByPeriod>;
  /** Statistic grouped by categories */
  statisticByCategory: Array<StatisticByCategory>;
  statisticByCurrency: Array<StatisticByCurrency>;
};


export type QueryCategoriesArgs = {
  type?: Maybe<Scalars['String']>;
};


export type QueryCategoryArgs = {
  id: Scalars['String'];
};


export type QueryCurrencyArgs = {
  id: Scalars['String'];
};


export type QueryExchangeArgs = {
  to: Scalars['String'];
  from: Scalars['String'];
  amount: Scalars['Float'];
};


export type QueryTransactionsArgs = {
  order?: Maybe<Scalars['String']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  import: Scalars['String'];
  addConnector: Scalars['String'];
  removeConnector: Scalars['String'];
  connectMonobank: Scalars['String'];
  disconnectMonobank: Scalars['String'];
  connectPrivat24: Scalars['String'];
  disconnectPrivat24: Scalars['String'];
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

export type GetTransactionsQueryVariables = Exact<{
  type?: Maybe<TransactionType>;
  from?: Maybe<Scalars['Float']>;
  to?: Maybe<Scalars['Float']>;
  limit?: Maybe<Scalars['Float']>;
  offset?: Maybe<Scalars['Float']>;
  walletIds?: Maybe<Array<Scalars['String']>>;
  categoryIds?: Maybe<Array<Scalars['String']>>;
}>;


export type GetTransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: (
    { __typename?: 'GetTransaction' }
    & Pick<GetTransaction, 'totalCount'>
    & { items: Array<(
      { __typename?: 'Transaction' }
      & Pick<Transaction, 'id' | 'type' | 'date' | 'description' | 'amount'>
      & { sourceWallet?: Maybe<(
        { __typename?: 'Wallet' }
        & WalletFragment
      )>, destinationWallet?: Maybe<(
        { __typename?: 'Wallet' }
        & WalletFragment
      )>, currency: (
        { __typename?: 'Currency' }
        & Pick<Currency, 'id' | 'name' | 'description' | 'symbol'>
      ), category: (
        { __typename?: 'Category' }
        & Pick<Category, 'id' | 'name' | 'type'>
        & { icon?: Maybe<(
          { __typename?: 'IconDto' }
          & Pick<IconDto, 'type' | 'name' | 'backgroundColor' | 'color'>
        )> }
      ) }
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

export const WalletFragmentDoc = gql`
    fragment wallet on Wallet {
  id
  name
  type
  description
}
    `;
export const AddConnectorDocument = gql`
    mutation addConnector($type: String!, $description: String!, $interval: Float!, $params: JSON!, $enabled: Boolean!) {
  addConnector(args: {type: $type, description: $description, interval: $interval, params: $params, enabled: $enabled})
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
  statisticByCategory(from: $from, to: $to, currencyName: $currencyName, walletIds: $walletIds, type: $type) {
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
  register(registerData: {email: $email, password: $password, firstName: $firstName, middleName: $middleName, lastName: $lastName, imageUrl: $imageUrl, additional: $additional}) {
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
export const GetTransactionsDocument = gql`
    query getTransactions($type: TransactionType, $from: Float, $to: Float, $limit: Float, $offset: Float, $walletIds: [String!], $categoryIds: [String!]) {
  transactions(type: $type, from: $from, to: $to, limit: $limit, offset: $offset, walletIds: $walletIds, categoryIds: $categoryIds) {
    totalCount
    items {
      id
      type
      sourceWallet {
        ...wallet
      }
      destinationWallet {
        ...wallet
      }
      currency {
        id
        name
        description
        symbol
      }
      category {
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
      date
      description
      amount
    }
  }
}
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
  transactions(type: $type, limit: $limit, offset: $offset, walletIds: [$walletId]) {
    totalCount
    items {
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
  }
}
    `;

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
export function useGetWalletTransactionsQuery(baseOptions?: Apollo.QueryHookOptions<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>) {
        return Apollo.useQuery<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>(GetWalletTransactionsDocument, baseOptions);
      }
export function useGetWalletTransactionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>) {
          return Apollo.useLazyQuery<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>(GetWalletTransactionsDocument, baseOptions);
        }
export type GetWalletTransactionsQueryHookResult = ReturnType<typeof useGetWalletTransactionsQuery>;
export type GetWalletTransactionsLazyQueryHookResult = ReturnType<typeof useGetWalletTransactionsLazyQuery>;
export type GetWalletTransactionsQueryResult = Apollo.QueryResult<GetWalletTransactionsQuery, GetWalletTransactionsQueryVariables>;
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