import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';
import { Icon } from 'src/database/models/category.model';

export class UpdateCategoryDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsBoolean()
  readonly isFixed: boolean;

  @IsString()
  readonly type: string;

  @IsObject()
  readonly icon: Icon;

  @IsString()
  readonly parent: string;

  @IsNumber()
  readonly updatedAt: number;

  @IsNumber()
  readonly deletedAt: number;
}
