export interface AddGoalValues {
  name: string;
  goal: number;
  progress: number;
  currencyId: string;
}

export interface UpdateGoalValues extends Partial<Omit<AddGoalValues, 'currencyId'>> {
  id: string;
}