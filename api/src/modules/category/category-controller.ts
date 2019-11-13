import Category from '../../models/category';
import { BadRequest } from 'ts-httpexceptions';

export class CategoryProvider {
  public async create(dto) {
    if (await Category.query().findById(dto.id)) {
      throw new BadRequest('Wallet already exists');
    }
    const category = await Category.query().insert({ ...dto });
    return category;
  }
}

export default CategoryProvider;
