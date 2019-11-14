import { BadRequest } from 'ts-httpexceptions';
import Budget from '../../models/budget';

export class BudgetProvider {
  public async create(dto) {
    if (await Budget.query().findById(dto.id)) {
      throw new BadRequest('Budget already exists');
    }
    const budget = await Budget.query().insert({
      ...dto,
      last_sync: new Date(),
    });
    return budget;
  }

  public async update(dto) {
    const budget = await Budget.query().findById(dto.id);
    if (!budget) {
      throw new BadRequest('No such budget');
    }
    await budget.$query().update({ ...dto, last_sync: new Date() });
    return budget;
  }

  public async get(id?: string) {
    return id ? Budget.query().findById(id) : Budget.query();
  }

  public async getByUserId(user_id: number) {
    return Budget.query().where({ user_id });
  }

  public async delete(id: string) {
    return Budget.query().deleteById(id);
  }
}

export default BudgetProvider;
