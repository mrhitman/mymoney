import { IsNumber } from 'class-validator';
import { CommonTransactionDto } from './common-transaction.dto';

export class CreateTransactionDto extends CommonTransactionDto {
  @IsNumber()
  readonly createdAt: number;
}
