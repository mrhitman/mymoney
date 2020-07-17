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
import { CategoryDto } from 'src/categories/dto/category.dto';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import User from 'src/database/models/user.model';
import { loaders } from 'src/dataloaders';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionCreate } from './input/transaction-create';
import { TransactionUpdate } from './input/transaction-update';
import { TransactionsService } from './transactions.service';
import { WalletDto } from 'src/wallets/dto/wallet.dto';

@Resolver((of) => TransactionDto)
export class TransactionsResolver {
  constructor(private readonly service: TransactionsService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [TransactionDto])
  public async transactions(@CurrentUser() user: User) {
    return this.service.getAll(user).then((data) => data.items);
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
    return loaders.category.load(transaction.categoryId);
  }

  @ResolveField('currency', (returns) => CurrencyDto)
  async getCurrency(
    @Parent() transaction: TransactionDto,
  ): Promise<CurrencyDto> {
    return loaders.currency.load(transaction.currencyId);
  }

  @ResolveField('sourceWallet', (returns) => WalletDto, { nullable: true })
  async getSourceWallet(@Parent() transaction: TransactionDto) {
    if (!transaction.sourceWalletId) {
      return;
    }

    return loaders.wallet.load(transaction.sourceWalletId);
  }

  @ResolveField('destinationWallet', (returns) => WalletDto, { nullable: true })
  async getDestinationWallet(@Parent() transaction: TransactionDto) {
    if (!transaction.destinationWalletId) {
      return;
    }

    return loaders.wallet.load(transaction.destinationWalletId);
  }
}
