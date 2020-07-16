import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Pocket } from './pocket';

@ObjectType('Wallet')
export class Wallet {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  type: string;

  @Field((type) => [Pocket])
  pockets: Pocket[];

  @Field((type) => Int, { nullable: true })
  syncAt: Date;
}
