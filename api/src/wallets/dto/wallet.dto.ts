import { ObjectType, Field, ID, Int, Float } from '@nestjs/graphql';
import { PocketDto } from './pocket';

@ObjectType('Wallet')
export class WalletDto {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  type: string;

  @Field((type) => [PocketDto])
  pockets: PocketDto[];

  @Field((type) => Int, { nullable: true })
  syncAt: Date;
}
