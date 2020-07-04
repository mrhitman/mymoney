import { CommonGoalDto } from './common-goal.dto';
import { IsNumber } from 'class-validator';

class CreateGoalDto extends CommonGoalDto {
  @IsNumber()
  readonly createdAt: number;
}

export default CreateGoalDto;
