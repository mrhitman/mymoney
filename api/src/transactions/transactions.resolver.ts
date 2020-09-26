import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import { CategoryDto } from 'src/categories/dto/category.dto';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import User from 'src/database/models/user.model';
import { DataLoader } from 'src/dataloader';
import { WalletDto } from 'src/wallets/dto/wallet.dto';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionCreate } from './input/transaction-create';
import { TransactionUpdate } from './input/transaction-update';
import { TransactionsService } from './transactions.service';
import { TransactionType } from './transaction-type';
import { Transactions } from './dto/transactions';
import { OrderByDirection } from 'objection';

@Resolver((of) => TransactionDto)
export class TransactionsResolver {
  constructor(private readonly service: TransactionsService, private readonly loader: DataLoader) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => Transactions)
  public async transactions(
    @CurrentUser() user: User,
    @Args('walletId', { nullable: true }) walletIds?: string[],
    @Args('currencyIds', { nullable: true }) currencyId?: string,
    @Args('categoryIds', { nullable: true }) categoryIds?: string[],
    @Args('type', { nullable: true, type: () => TransactionType }) type?: TransactionType,
    @Args('limit', { nullable: true }) limit?: number,
    @Args('offset', { nullable: true }) offset?: number,
    @Args('order', { nullable: true }) order?: OrderByDirection,
  ) {
    const query = this.service.getAll(user, {
      walletIds,
      type,
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
      query.orderBy('id', order);
    }

    return {
      totalCount: count,
      items: query,
    };
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => TransactionDto)
  public async transaction(@CurrentUser() user: User, @Args('id') id: string) {
    return this.service.getOne(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => TransactionDto)
  async createTransaction(
    @CurrentUser() user: User,
    @Args('transactionCreateData')
    data: TransactionCreate,
  ) {
    return this.service.create(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => TransactionDto)
  async updateTransaction(
    @CurrentUser() user: User,
    @Args('transactionUpdateData')
    data: TransactionUpdate,
  ) {
    return this.service.update(user, data);
  }

  @ResolveField('category', (returns) => CategoryDto)
  async getCategory(@Parent() transaction: TransactionDto) {
    return this.loader.category.load(transaction.categoryId);
  }

  @ResolveField('currency', (returns) => CurrencyDto)
  async getCurrency(@Parent() transaction: TransactionDto): Promise<CurrencyDto> {
    return this.loader.currency.load(transaction.currencyId);
  }

  @ResolveField('sourceWallet', (returns) => WalletDto, { nullable: true })
  async getSourceWallet(@Parent() transaction: TransactionDto) {
    if (!transaction.sourceWalletId) {
      return;
    }

    return this.loader.wallet.load(transaction.sourceWalletId);
  }

  @ResolveField('destinationWallet', (returns) => WalletDto, { nullable: true })
  async getDestinationWallet(@Parent() transaction: TransactionDto) {
    if (!transaction.destinationWalletId) {
      return;
    }

    return this.loader.wallet.load(transaction.destinationWalletId);
  }
}
