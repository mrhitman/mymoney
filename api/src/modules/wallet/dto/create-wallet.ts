export interface CreateWalletDto {
  user_id: number;
  name: string;
  description: string;
  cardNumber: string;
  type: string;
  pockets: any;
}

export default CreateWalletDto;
