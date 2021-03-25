import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { OrderByDirection } from 'objection';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import { UserCategoryDto } from 'src/categories/dto/user-category.dto';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import User from 'src/database/models/user.model';
import { DataLoader } from 'src/dataloader';
import { WalletDto } from 'src/wallets/dto/wallet.dto';
import { TransactionDto } from './dto/transaction.dto';
import { Transactions } from './dto/transactions';
import { TransactionCreate } from './input/transaction-create';
import { TransactionUpdate } from './input/transaction-update';
import { TransactionType } from './transaction-type';
import { TransactionsService } from './transactions.service';

@Resolver(() => TransactionDto)
export class TransactionsResolver {
  constructor(private readonly service: TransactionsService, private readonly loader: DataLoader) { }

  @UseGuards(GqlAuthGuard)
  @Query(() => String, { description: 'Not fully implemented yet' })
  async export(
    @CurrentUser() user: User,
    @Args('walletIds', { nullable: true, type: () => [String] }) walletIds?: string[],
    @Args('categoryIds', { nullable: true, type: () => [String] }) categoryIds?: string[],
    @Args('currencyId', { nullable: true }) currencyId?: string,
    @Args('from', { nullable: true }) from?: number,
    @Args('to', { nullable: true }) to?: number,
    @Args('type', { nullable: true, type: () => TransactionType }) type?: TransactionType,
    @Args('search', { nullable: true }) search?: string,
    @Args('amountGteFilter', { nullable: true }) amountGteFilter?: number,
    @Args('amountLteFilter', { nullable: true }) amountLteFilter?: number,
    @Args('orderBy', { nullable: true }) orderBy?: string,
    @Args('order', { nullable: true }) order?: OrderByDirection,
  ) {
    return this.service.export(user, {
      walletIds,
      type,
      from,
      to,
      search,
      order,
      orderBy,
      amountGteFilter,
      amountLteFilter,
      currencyId,
      categoryIds,
    });
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Transactions)
  async transactions(
    @CurrentUser() user: User,
    @Args('walletIds', { nullable: true, type: () => [String] }) walletIds?: string[],
    @Args('categoryIds', { nullable: true, type: () => [String] }) categoryIds?: string[],
    @Args('currencyId', { nullable: true }) currencyId?: string,
    @Args('from', { nullable: true }) from?: number,
    @Args('to', { nullable: true }) to?: number,
    @Args('type', { nullable: true, type: () => TransactionType }) type?: TransactionType,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('offset', { nullable: true }) offset?: number,
    @Args('search', { nullable: true }) search?: string,
    @Args('amountGteFilter', { nullable: true }) amountGteFilter?: number,
    @Args('amountLteFilter', { nullable: true }) amountLteFilter?: number,
    @Args('orderBy', { nullable: true }) orderBy?: string,
    @Args('order', { nullable: true }) order?: OrderByDirection,
  ) {
    const query = this.service.getAll(user, {
      walletIds,
      type,
      from,
      to,
      search,
      amountGteFilter,
      amountLteFilter,
      currencyId,
      categoryIds,
    });

    const countQuery = query.clone();
    countQuery.clearSelect();
    const { count } = (await countQuery.count('id').first()) as any;

    if (limit) {
      query.limit(limit);
    }

    if (offset) {
      query.offset(offset);
    }

    if (order) {
      query.orderBy(orderBy || 'date', order);
    }

    return {
      totalCount: count,
      items: query,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => TransactionDto)
  async transaction(@CurrentUser() user: User, @Args('id') id: string) {
    return this.service.getOne(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TransactionDto)
  async createTransaction(
    @CurrentUser() user: User,
    @Args('transactionCreateData')
    data: TransactionCreate,
  ) {
    return this.service.create(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TransactionDto)
  async updateTransaction(
    @CurrentUser() user: User,
    @Args('transactionUpdateData')
    data: TransactionUpdate,
  ) {
    return this.service.update(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => TransactionDto)
  async deleteTransaction(@CurrentUser() user: User, @Args('id') id: string) {
    return this.service.delete(user, id);
  }

  @ResolveField('category', () => UserCategoryDto)
  async getCategory(@Parent() transaction: TransactionDto) {
    return this.loader.category.load(transaction.categoryId);
  }

  @ResolveField('currency', () => CurrencyDto)
  async getCurrency(@Parent() transaction: TransactionDto): Promise<CurrencyDto> {
    return this.loader.currency.load(transaction.currencyId);
  }

  @ResolveField('sourceWallet', () => WalletDto, { nullable: true })
  async getSourceWallet(@Parent() transaction: TransactionDto) {
    if (!transaction.sourceWalletId) {
      return;
    }

    return this.loader.wallet.load(transaction.sourceWalletId);
  }

  @ResolveField('destinationWallet', () => WalletDto, { nullable: true })
  async getDestinationWallet(@Parent() transaction: TransactionDto) {
    if (!transaction.destinationWalletId) {
      return;
    }

    return this.loader.wallet.load(transaction.destinationWalletId);
  }
}
