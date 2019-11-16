import { BadRequest, Forbidden } from 'ts-httpexceptions';
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
    if (budget.user_id !== dto.user_id) {
      throw new Forbidden('No your budget');
    }
    await budget.$query().update({ ...dto, last_sync: new Date() });
    return budget;
  }

  public async get(user_id: number, id?: string) {
    return id
      ? Budget.query()
          .where({ user_id })
          .findById(id)
      : Budget.query().where({ user_id });
  }

  public async delete(user_id: number, id: string) {
    return Budget.query()
      .where({ user_id })
      .deleteById(id);
  }
}

export default BudgetProvider;
