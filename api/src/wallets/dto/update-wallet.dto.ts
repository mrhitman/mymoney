import { CommonWalletDto } from './common-wallet.dto';
import { IsString } from 'class-validator';

export class UpdateWalletDto extends CommonWalletDto {
  @IsString()
  id: string;
}
