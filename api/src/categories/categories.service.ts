import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { DateTime } from 'luxon';
import Category from 'src/database/models/category.model';
import User from 'src/database/models/user.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  public async getAll(user: User) {
    return Category.query().where({ userId: user.id });
  }

  public async getCategory(id: string, userId: number) {
    const category = await Category.query().findById(id);

    if (!category) {
      throw new BadRequestException('No such category');
    }

    if (category.userId !== userId) {
      throw new ForbiddenException('You are not access to this item');
    }

    return category;
  }

  public async create(data: CreateCategoryDto, user: User) {
    await Category.query().insert({
      ...data,
      userId: user.id,
      createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
      syncAt: DateTime.local().toJSDate(),
    });
  }

  public async update(data: UpdateCategoryDto, user: User) {
    const category = await this.getCategory(data.id, user.id);

    await category.$query().update({
      ...data,
      updatedAt: DateTime.fromSeconds(data.updatedAt).toJSDate(),
      deletedAt: data.deletedAt
        ? DateTime.fromSeconds(data.deletedAt).toJSDate()
        : null,
    });
  }

  public async delete(id: string, user: User) {
    const category = await this.getCategory(id, user.id);

    return category.$query().delete();
  }
}
