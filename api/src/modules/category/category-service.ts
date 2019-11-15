import { BadRequest, Forbidden } from 'ts-httpexceptions';
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
    if (category.user_id !== dto.user_id) {
      throw new Forbidden('Not your category');
    }
    await category.$query().update({ ...dto, last_sync: new Date() });
    return category;
  }

  public async get(user_id: number, id?: string) {
    return id
      ? Category.query()
          .where({ user_id })
          .findById(id)
      : Category.query().where({ user_id });
  }

  public async delete(user_id: number, id: string) {
    return Category.query()
      .where({ user_id, id })
      .deleteById(id);
  }
}

export default CategoryProvider;
