import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import Category from 'src/database/models/category.model';
import User from 'src/database/models/user.model';
import { CategoryCreate } from './input/category-create';
import { CategoryUpdate } from './input/category-update';

@Injectable()
export class CategoriesService {
  public async getAll(user: User, params?: { type?: string }) {
    const query = Category.query().where({ userId: user.id }).orWhereNull('userId');

    if (params && params.type) {
      query.andWhere({ type: params.type });
    }

    return query;
  }

  public async findOne(id: string, user: User) {
    const category = await Category.query().findById(id);

    if (!category) {
      throw new BadRequestException('No such category');
    }

    if (category.userId && category.userId !== user.id) {
      throw new ForbiddenException('You are not access to this item');
    }

    return category;
  }

  public async create(data: CategoryCreate, user: User) {
    await Category.query().insert({
      ...data,
      userId: user.id,
      createdAt: DateTime.fromSeconds(data.createdAt).toJSDate(),
      syncAt: DateTime.local().toJSDate(),
    });
  }

  public async update(data: CategoryUpdate, user: User) {
    const category = await this.findOne(data.id, user);

    if (category.userId) {
      await category.$query().update({
        ...data,
        updatedAt: DateTime.fromSeconds(data.updatedAt).toJSDate(),
        deletedAt: data.deletedAt ? DateTime.fromSeconds(data.deletedAt).toJSDate() : null,
      });
    }
  }

  public async delete(id: string, user: User) {
    const category = await this.findOne(id, user);

    if (!category.userId) {
      return;
    }

    return category.$query().delete();
  }
}
