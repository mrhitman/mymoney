import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';
import Category from '../database/models/category.model';
import UserCategory from '../database/models/user-category.model';
import User from '../database/models/user.model';
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
    return UserCategory.query().insert({
      categoryId: data.baseCategoryId,
      ...omit(data, ['baseCategoryId']),
      id: data.id || uuid(),
      userId: user.id,
      createdAt: data.createdAt ? DateTime.fromSeconds(data.createdAt).toJSDate() : new Date(),
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
