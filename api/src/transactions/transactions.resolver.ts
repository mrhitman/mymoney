import { UseGuards } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { CurrencyDto } from 'src/currencies/dto/currency.dto';
import User from 'src/database/models/user.model';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import { Category } from '../categories/dto/category';
import { loaders } from '../dataloaders';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionsService } from './transactions.service';

@Resolver((of) => TransactionDto)
export class TransactionsResolver {
  constructor(private readonly transactionService: TransactionsService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [TransactionDto])
  public async transactions(@CurrentUser() user: User) {
    return this.transactionService.getAll(user).then((data) => data.items);
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => TransactionDto)
  public async transaction(@CurrentUser() user: User, @Args('id') id: string) {
    return this.transactionService.getOne(user, id);
  }

  @ResolveField('category', (returns) => Category)
  async getCategory(@Parent() transaction: TransactionDto) {
    return loaders.category.load(transaction.categoryId);
  }

  @ResolveField('currency', (returns) => CurrencyDto)
  async getCurrency(
    @Parent() transaction: TransactionDto,
  ): Promise<CurrencyDto> {
    return loaders.currency.load(transaction.currencyId);
  }
}
