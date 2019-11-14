import { BadRequest } from 'ts-httpexceptions';
import Category from '../../models/category';
import CreateCategoryDto from './dto/create-category';

export class CategoryProvider {
  public async create(dto: CreateCategoryDto) {
    if (await Category.query().findById(dto.id)) {
      throw new BadRequest('Wallet already exists');
    }
    const category = await Category.query().insert({
      ...dto,
      last_sync: new Date(),
    });
    return category;
  }

  public async update(dto) {
    const category = await Category.query().findById(dto.id);
    if (!category) {
      throw new BadRequest('No such category');
    }
    await category.$query().update({ ...dto, last_sync: new Date() });
    return category;
  }

  public async get(id?: string) {
    return id ? Category.query().findById(id) : Category.query();
  }

  public async getByUserId(user_id: number) {
    return Category.query().where({ user_id });
  }

  public async delete(id: string) {
    return Category.query().deleteById(id);
  }
}

export default CategoryProvider;
