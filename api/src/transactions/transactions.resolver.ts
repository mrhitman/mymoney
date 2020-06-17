import { UseGuards } from '@nestjs/common';
import { Info, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import User from 'src/database/models/user.model';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionsService } from './transactions.service';
import { CurrenciesService } from '../currencies/currencies.service';

@Resolver((of) => TransactionDto)
export class TransactionsResolver {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly currencyService: CurrenciesService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [TransactionDto])
  public async transactions(
    @CurrentUser() user: User,
    @Info({
      transform: (value) => {
        return value.fieldNodes
          .find((f) => f.name.value === 'transactions')
          .selectionSet.selections.map((f) => f.name.value);
      },
    })
    info: string[],
  ): Promise<TransactionDto[]> {
    return this.transactionService.getAll(
      user,
      info.includes('currency') ? { relation: '[currency]' } : {},
    );
  }

  // @ResolveProperty('currency')
  // public async currency(@Parent() transaction: TransactionDto) {
  //   const currency = transaction.currency;

  //   if (currency) {
  //     const rates = await this.currencyService.rates();

  //     return {
  //       ...transaction,
  //       currency: {
  //         ...currency,
  //         rate: rates.rates[currency.name],
  //       },
  //     };
  //   }

  //   return transaction;
  // }
}