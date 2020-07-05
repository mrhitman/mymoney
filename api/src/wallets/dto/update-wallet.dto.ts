import { CommonWalletDto } from './common-wallet.dto';
import { IsString, IsNumber } from 'class-validator';

export class UpdateWalletDto extends CommonWalletDto {
  @IsString()
  id: string;

  @IsNumber()
  updatedAt: number;
}
