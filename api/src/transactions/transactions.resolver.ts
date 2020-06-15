import { Resolver, Query } from '@nestjs/graphql';
import { TransactionDto } from './dto/transaction.dto';
import { TransactionsService } from './transactions.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import { CurrentUser } from 'src/auth/current-user';
import User from 'src/database/models/user.model';

@Resolver((of) => TransactionDto)
export class TransactionsResolver {
  constructor(private readonly service: TransactionsService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => [TransactionDto])
  async transactions(@CurrentUser() user: User): Promise<TransactionDto[]> {
    return this.service.getAll(user);
  }
}
