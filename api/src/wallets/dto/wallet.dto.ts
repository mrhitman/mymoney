import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { PocketDto } from './pocket.dto';

@ObjectType('Wallet')
export class WalletDto {
  @Field(() => ID)
  readonly id: string;

  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly description: string;

  @Field({ nullable: true })
  readonly image: string;

  @Field()
  readonly type: string;

  @Field(() => Boolean)
  readonly allowNegativeBalance: boolean;

  @Field(() => [PocketDto])
  readonly pockets: PocketDto[];

  @Field(() => Int)
  readonly syncAt: Date;

  @Field(() => Int)
  readonly createdAt: Date;
}
