import { IsNumber } from 'class-validator';
import { CommonTransactionDto } from './common-transaction.dto';

export class UpdateTransactionDto extends CommonTransactionDto {
  @IsNumber()
  readonly updatedAt: number;

  @IsNumber()
  readonly deletedAt: number;
}
