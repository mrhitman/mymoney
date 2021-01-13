import * as Knex from 'knex';
import { groupBy } from 'lodash';
import { v4 as uuid } from 'uuid';

async function createUserCategories(user, knex: Knex) {
  const count = +((await knex
    .select()
    .from('user_categories')
    .where({ user_id: user.id })
    .count({ count: '*' })) as any)[0].count;

  if (count > 0) {
    return;
  }

  const categories = await knex.select().from('categories');
  const rootUserCategories = groupBy(
    await knex
      .select()
      .from('user_categories')
      .insert(
        categories
          .filter((c) => !c.parent)
          .map((c) => ({
            id: uuid(),
            user_id: user.id,
            category_id: c.id,
            name: c.name,
            codes: JSON.stringify(c.codes),
            type: c.type,
            is_fixed: c.is_fixed,
            icon: JSON.stringify(c.icon),
          })),
      )
      .returning('*'),
    'category_id',
  );

  await knex.into('user_categories').insert(
    categories
      .filter((c) => !!c.parent)
      .map((c) => ({
        id: uuid(),
        user_id: user.id,
        category_id: c.id,
        parent: (rootUserCategories[c.parent][0] as any).id,
        name: c.name,
        codes: JSON.stringify(c.codes),
        type: c.type,
        is_fixed: c.is_fixed,
        icon: JSON.stringify(c.icon),
      })),
  );
}

async function updateUpTransactions(user, knex: Knex) {
  const transactions = await knex.select().from('transactions').where({ user_id: user.id });
  const userCategories = groupBy(
    await knex.select().from('user_categories').where({ user_id: user.id }),
    'category_id',
  );
  await Promise.all(
    transactions.map((trx) => {
      return knex
        .update({
          category_id: userCategories[trx.category_id][0].id,
        })
        .table('transactions')
        .where({ id: trx.id });
    }),
  );
}

async function updateDownTransactions(user, knex: Knex) {
  const transactions = await knex.select().from('transactions').where({ user_id: user.id });
  const userCategories = groupBy(
    await knex.select().from('user_categories').where({ user_id: user.id }),
    'id',
  );
  await Promise.all(
    transactions.map((trx) => {
      return knex()
        .update({
          category_id: userCategories[trx.category_id][0].category_id,
        })
        .table('transactions')
        .where({ id: trx.id });
    }),
  );
}

function processUpUser(knex: Knex) {
  return async (user) => {
    await createUserCategories(user, knex);
    await updateUpTransactions(user, knex);
  };
}

function processDownUser(knex: Knex) {
  return async (user) => {
    await updateDownTransactions(user, knex);
  };
}

export async function up(knex: Knex): Promise<any> {
  await knex.schema.alterTable('categories', (t) => {
    t.dropColumn('user_id');
  });
  await knex.schema.alterTable('transactions', (t) => {
    t.dropForeign(['category_id']);
  });
  const users = await knex.select().from('users');
  await Promise.all(users.map(processUpUser(knex)));
  await knex.schema.alterTable('transactions', (t) => {
    t.foreign('category_id').references('id').inTable('user_categories').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.alterTable('categories', (t) => {
    t.integer('user_id');
  });
  await knex.schema.alterTable('transactions', (t) => {
    t.dropForeign(['category_id']);
  });
  const users = await knex.select().from('users');
  await Promise.all(users.map(processDownUser(knex)));
  await knex.schema.raw('TRUNCATE user_categories');
  await knex.schema.alterTable('transactions', (t) => {
    t.foreign('category_id').references('id').inTable('categories').onDelete('CASCADE');
  });
}
