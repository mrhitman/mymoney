import { IsNumber, IsString } from 'class-validator';
import { CommonTransactionDto } from './common-transaction.dto';

export class UpdateTransactionDto extends CommonTransactionDto {
  @IsString()
  readonly id: string;

  @IsNumber()
  readonly updatedAt: number;

  @IsNumber()
  readonly deletedAt: number;
}
