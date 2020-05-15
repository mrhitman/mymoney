import {
  IsBoolean,
  IsDateString,
  IsObject,
  IsString,
  IsMilitaryTime,
} from 'class-validator';

export class CreateCategoryDto {
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
  readonly icon: any;

  @IsString()
  readonly parent: string;

  readonly createdAt: number;
  readonly updatedAt: number;
  readonly deletedAt: number;
  readonly syncAt: number;
}
