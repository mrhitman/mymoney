import { Pocket } from 'models/wallet';

export interface CreateWalletDto {
  id: string;
  user_id: number;
  name: string;
  description: string;
  cardNumber: string;
  type: string;
  pockets: Pocket[];
}

export default CreateWalletDto;
