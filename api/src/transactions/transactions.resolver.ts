import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import { Category } from 'src/categories/dto/category';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import User from 'src/database/models/user.model';
import { loaders } from 'src/dataloaders';
import { Transaction } from './dto/transaction';
import { TransactionCreate } from './input/transaction-create';
import { TransactionUpdate } from './input/transaction-update';
import { TransactionsService } from './transactions.service';
import { Wallet } from 'src/wallets/dto/wallet';

@Resolver((of) => Transaction)
export class TransactionsResolver {
  constructor(private readonly service: TransactionsService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [Transaction])
  public async transactions(@CurrentUser() user: User) {
    return this.service.getAll(user).then((data) => data.items);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => Transaction)
  public async transaction(@CurrentUser() user: User, @Args('id') id: string) {
    return this.service.getOne(user, id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Transaction)
  async createTransaction(
    @CurrentUser() user: User,
    @Args('transactionCreateData')
    data: TransactionCreate,
  ) {
    return this.service.create(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Transaction)
  async updateTransaction(
    @CurrentUser() user: User,
    @Args('transactionUpdateData')
    data: TransactionUpdate,
  ) {
    return this.service.update(user, data);
  }

  @ResolveField('category', (returns) => Category)
  async getCategory(@Parent() transaction: Transaction) {
    return loaders.category.load(transaction.categoryId);
  }

  @ResolveField('currency', (returns) => CurrencyDto)
  async getCurrency(@Parent() transaction: Transaction): Promise<CurrencyDto> {
    return loaders.currency.load(transaction.currencyId);
  }

  @ResolveField('sourceWallet', (returns) => Wallet, { nullable: true })
  async getSourceWallet(@Parent() transaction: Transaction) {
    if (!transaction.sourceWalletId) {
      return;
    }

    return loaders.wallet.load(transaction.sourceWalletId);
  }

  @ResolveField('destinationWallet', (returns) => Wallet, { nullable: true })
  async getDestinationWallet(@Parent() transaction: Transaction) {
    if (!transaction.destinationWalletId) {
      return;
    }

    return loaders.wallet.load(transaction.destinationWalletId);
  }
}
