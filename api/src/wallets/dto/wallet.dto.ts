import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PocketDto } from './pocket.dto';

@ObjectType('Wallet')
export class WalletDto {
  @Field((type) => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly description: string;

  @Field()
  readonly type: string;

  @Field(() => Boolean)
  readonly allowNegativeBalance: boolean;

  @Field((type) => [PocketDto])
  readonly pockets: PocketDto[];

  @Field((type) => Int)
  readonly syncAt: Date;

  @Field((type) => Int)
  readonly createdAt: Date;

  // @Field((type) => [TransactionDto])
  // readonly transactions: Transaction[];
}
