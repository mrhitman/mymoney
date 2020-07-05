import { CommonWalletDto } from './common-wallet.dto';
import { IsNumber } from 'class-validator';

class CreateWalletDto extends CommonWalletDto {
  @IsNumber()
  readonly createdAt: number;
}

export default CreateWalletDto;
