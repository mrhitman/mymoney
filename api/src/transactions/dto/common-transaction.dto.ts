import { IsNumber, IsString } from 'class-validator';

export class CommonTransactionDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly categoryId: string;

  @IsString()
  readonly sourceWalletId: string;

  @IsString()
  readonly destinationWalletId: string;

  @IsNumber()
  readonly fine: number;

  @IsNumber()
  readonly amount: number;

  @IsNumber()
  readonly date: number;
}
