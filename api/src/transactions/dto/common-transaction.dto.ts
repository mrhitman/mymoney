import {
  IsNumber,
  IsString,
  Allow,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class CommonTransactionDto {
  @IsString()
  readonly categoryId: string;

  @IsString()
  readonly currencyId: string;

  @IsString()
  @ValidateIf((o, v) => o.type !== 'income')
  readonly sourceWalletId: string;

  @IsString()
  @ValidateIf((o, v) => o.type !== 'outcome')
  readonly destinationWalletId: string;

  @IsNumber()
  @IsOptional()
  readonly fine: number;

  @IsNumber()
  readonly amount: number;

  @IsNumber()
  readonly date: number;

  @IsString()
  readonly description: string;
}
