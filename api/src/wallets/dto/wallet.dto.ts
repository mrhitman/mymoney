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

  @Field((type) => [PocketDto])
  readonly pockets: PocketDto[];

  @Field((type) => Int, { nullable: true })
  readonly syncAt: Date;
}
