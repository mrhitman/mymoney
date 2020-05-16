import { BadRequestException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import Category from 'src/database/models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  public async getAll() {
    return Category.query();
  }

  public async getCategory(id: string) {
    const category = await Category.query().findById(id);

    if (!category) {
      throw new BadRequestException('No such category');
    }

    return category;
  }

  public async create(data: CreateCategoryDto) {
    await Category.query().insert({
      ...data,
      createdAt: DateTime.fromMillis(data.createdAt).toJSDate(),
      syncAt: DateTime.local().toJSDate(),
    });
  }

  public async update(data: UpdateCategoryDto) {
    const category = await this.getCategory(data.id);

    await category.$query().update({
      ...data,
      updatedAt: DateTime.fromMillis(data.updatedAt).toJSDate(),
      deletedAt: data.deletedAt
        ? DateTime.fromMillis(data.deletedAt).toJSDate()
        : null,
    });
  }

  public async delete(id: string) {
    const category = await this.getCategory(id);

    return category.$query().delete();
  }
}
