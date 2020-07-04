import { IsNumber, IsString } from 'class-validator';

export class CommonGoalDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly amount: number;
}
