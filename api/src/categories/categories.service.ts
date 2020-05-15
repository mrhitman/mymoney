import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import Category from 'src/database/models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  async create(data: CreateCategoryDto) {
    await Category.query().insert({
      ...data,
      createdAt: DateTime.fromMillis(data.createdAt).toJSDate(),
      updatedAt: data.updatedAt
        ? DateTime.fromMillis(data.updatedAt).toJSDate()
        : null,
      deletedAt: data.deletedAt
        ? DateTime.fromMillis(data.deletedAt).toJSDate()
        : null,
      syncAt: data.syncAt
        ? DateTime.fromMillis(data.syncAt).toJSDate()
        : DateTime.local().toJSDate(),
    });
  }
}
