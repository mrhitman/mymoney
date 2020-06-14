import { IsNumber, IsString } from 'class-validator';
import { CommonTransactionDto } from './common-transaction.dto';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Transaction')
export class TransactionDto extends CommonTransactionDto {
  @Field((type) => ID)
  @IsString()
  readonly id: string;

  @IsNumber()
  readonly updatedAt: number;

  @IsNumber()
  readonly deletedAt: number;
}
