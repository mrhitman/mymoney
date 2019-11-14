import { BadRequest } from 'ts-httpexceptions';
import Transaction from '../../models/transaction';

export class TransactionProvider {
  public async create(dto) {
    if (await Transaction.query().findById(dto.id)) {
      throw new BadRequest('Transaction already exists');
    }
    const category = await Transaction.query().insert({
      ...dto,
      last_sync: new Date(),
    });
    return category;
  }

  public async update(dto) {
    const category = await Transaction.query().findById(dto.id);
    if (!category) {
      throw new BadRequest('No such transaction');
    }
    await category.$query().update({ ...dto, last_sync: new Date() });
    return category;
  }

  public async get(id?: string) {
    return id ? Transaction.query().findById(id) : Transaction.query();
  }

  public async getByUserId(user_id: number) {
    return Transaction.query().where({ user_id });
  }

  public async delete(id: string) {
    return Transaction.query().deleteById(id);
  }
}

export default TransactionProvider;
