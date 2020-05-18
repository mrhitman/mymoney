import { IsNumber } from 'class-validator';
import { CommonCategoryDto } from './common-category.dto';

export class CreateCategoryDto extends CommonCategoryDto {
  @IsNumber()
  readonly createdAt: number;
}
