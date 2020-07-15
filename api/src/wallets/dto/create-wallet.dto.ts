import { IsNumber, IsOptional } from 'class-validator';
import { CommonWalletDto } from './common-wallet.dto';

class CreateWalletDto extends CommonWalletDto {
  @IsOptional()
  @IsNumber()
  readonly createdAt: number;
}

export default CreateWalletDto;
