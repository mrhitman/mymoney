export class CreateCategoryDto {
  id: string;
  name: string;
  user_id: number;
  parent_id: string;
  icon: object;
  type: string;
}

export default CreateCategoryDto;
