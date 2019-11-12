export interface UpdateWalletDto {
  id: number;
  user_id: number;
  name: string;
  description: string;
  cardNumber: string;
  type: string;
}

export default UpdateWalletDto;
