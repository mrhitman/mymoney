import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class PocketDto {
  @IsString()
  currencyId: string;

  @IsNumber()
  amount: number;
}

export class CommonWalletDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  type: string;

  @ValidateNested({ each: true })
  pockets: PocketDto[];
}
