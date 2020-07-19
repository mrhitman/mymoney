import { Field, ObjectType } from '@nestjs/graphql';
import { WalletDto } from 'src/wallets/dto/wallet.dto';
import { GoalDto } from './goal.dto';

@ObjectType('GoalSaveResponse')
export class GoalSaveDto {
  @Field((type) => GoalDto)
  readonly goal: GoalDto;

  @Field((type) => WalletDto)
  readonly wallet: WalletDto;
}
