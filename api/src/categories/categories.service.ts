import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import UserCategory from 'src/database/models/user-category.model';
import Category from 'src/database/models/category.model';
import User from 'src/database/models/user.model';
import { CategoryCreate } from './input/category-create';
import { CategoryUpdate } from './input/category-update';

@Injectable()
export class CategoriesService {
  public async getBaseCategories() {
    return Category.query();
  }

  public async getAll(user: User, params?: { type?: string }) {
    const query = UserCategory.query().where({ userId: user.id });

    if (params && params.type) {
      query.andWhere({ type: params.type });
    }

    return query;
  }

  public async findOne(id: string, user: User) {
    const category = await UserCategory.query().findById(id);

    if (!category) {
      throw new BadRequestException('No such category');
    }

    if (category.userId !== user.id) {
      throw new ForbiddenException('You are not access to this item');
    }

    return category;
  }

  public async create(data: CategoryCreate, user: User) {
    await UserCategory.query().insert({
      ...data,
      userId: user.id,
      createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
      syncAt: DateTime.local().toJSDate(),
    });
  }

  public async update(data: CategoryUpdate, user: User) {
    const category = await this.findOne(data.id, user);

    await category.$query().update({
      ...data,
      updatedAt: DateTime.fromSeconds(data.updatedAt).toJSDate(),
      deletedAt: data.deletedAt ? DateTime.fromSeconds(data.deletedAt).toJSDate() : null,
    });
  }

  public async delete(id: string, user: User) {
    const category = await this.findOne(id, user);
    return category.$query().delete();
  }
}
