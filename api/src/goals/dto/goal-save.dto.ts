import { Field, ObjectType } from '@nestjs/graphql';
import { WalletDto } from 'src/wallets/dto/wallet.dto';
import { GoalDto } from './goal.dto';

@ObjectType('GoalSaveResponse')
export class GoalSaveDto {
  @Field(() => GoalDto)
  readonly goal: GoalDto;

  @Field(() => WalletDto)
  readonly wallet: WalletDto;
}
