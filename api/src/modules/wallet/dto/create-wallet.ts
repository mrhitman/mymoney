export interface CreateWalletDto {
  user_id: number;
  name: string;
  description: string;
  cardNumber: string;
  type: string;
}

export default CreateWalletDto;
