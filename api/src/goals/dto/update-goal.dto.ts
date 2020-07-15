import { CommonGoalDto } from './common-goal.dto';

class UpdateGoalDto extends CommonGoalDto {
  readonly id: string;
}

export default UpdateGoalDto;
