import { IsNumber } from 'class-validator';
import { CommonCategoryDto } from './common-category.dto';

export class UpdateCategoryDto extends CommonCategoryDto {
  @IsNumber()
  readonly updatedAt: number;

  @IsNumber()
  readonly deletedAt: number;
}
