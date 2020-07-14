import { IsNumber, IsOptional } from 'class-validator';
import { CommonTransactionDto } from './common-transaction.dto';

export class CreateTransactionDto extends CommonTransactionDto {
    @IsOptional()
    @IsNumber({ allowNaN: true })
    readonly createdAt: number;
}
