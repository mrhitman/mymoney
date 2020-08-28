import { Field, ObjectType } from '@nestjs/graphql';
import { TransactionDto } from './transaction.dto';

@ObjectType('GetTransaction')
export class Transactions {
  @Field()
  totalCount: number;

  @Field(() => [TransactionDto])
  items: TransactionDto[];
}
