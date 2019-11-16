import { BadRequest, Forbidden } from 'ts-httpexceptions';
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

    if (category.user_id !== dto.user_id) {
      throw new Forbidden('Not your transaction');
    }

    await category.$query().update({ ...dto, last_sync: new Date() });
    return category;
  }

  public async get(user_id: number, id?: string) {
    return id
      ? Transaction.query()
          .where({ user_id })
          .findById(id)
      : Transaction.query().where({ user_id });
  }

  public async delete(user_id: number, id: string) {
    return Transaction.query()
      .where({ user_id })
      .deleteById(id);
  }
}

export default TransactionProvider;
