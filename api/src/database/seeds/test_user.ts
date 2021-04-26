import bcrypt from 'bcryptjs';
import chance from 'chance';
import * as Knex from 'knex';
import { v4 as uuid } from 'uuid';
import { defaultCategories } from '../../utils/categories';
import moment from 'moment';
import _ from 'lodash';

export async function seed(knex: Knex): Promise<any> {
  await knex('transaction').del();
  await knex('user').del();
  await knex('category').del();
  await knex('goal').del();
  await knex('budget').del();
  await knex('wallet').del();
  const password = await bcrypt.hash('1', 10);
  const [first_name, middle_name, last_name] = chance().name({ middle_initial: true }).split(' ');
  await knex('user').insert({
    first_name,
    middle_name,
    last_name,
    email: 'admin@admin.com',
    password,
  });
  const userId = await knex
    .select(['id'])
    .from('user')
    .where({ email: 'admin@admin.com' })
    .first<{ id: number }>();
  await Promise.all(
    defaultCategories.map((category) =>
      knex
        .insert({
          id: category.id,
          name: category.name,
          parent: category.parentId,
          icon: category.icon,
          type: category.type,
          is_fixed: true,
          codes: JSON.stringify(category.codes || []),
        })
        .into('category'),
    ),
  );
  const categories = (
    await Promise.all(
      defaultCategories.map((category) =>
        knex
          .insert({
            id: uuid(),
            category_id: category.id,
            user_id: userId.id,
            name: category.name,
            parent: category.parentId,
            icon: category.icon,
            type: category.type,
            is_fixed: true,
            codes: JSON.stringify(category.codes || []),
          })
          .into('user_category')
          .returning('*'),
      ),
    )
  ).map((c) => c[0]);

  await knex
    .insert({
      id: uuid(),
      user_id: userId.id,
      date: moment().startOf('month').toDate(),
      deadline: moment().endOf('month').toDate(),
      currency_id: '096225f7-d38e-5650-8b9f-a19034a5fe6e',
      incomes: JSON.stringify(
        _.chain(categories)
          .filter((c) => c.type === 'income')
          .filter((c) => !c.parent)
          .shuffle()
          .value()
          .slice(0, 2)
          .map((c) => ({
            categoryId: c.id,
            progress: _.random(50000, 150000),
            amount: Math.floor(_.random(60000, 150000) / 5) * 5,
          })),
      ),
      outcomes: JSON.stringify(
        _.chain(categories)
          .filter((c) => c.type === 'outcome')
          .filter((c) => !c.parent)
          .shuffle()
          .value()
          .slice(0, 4)
          .map((c) => ({
            categoryId: c.id,
            progress: _.random(0, 5000),
            amount: Math.floor(_.random(3000, 10000) / 5) * 5,
          })),
      ),
      savings: JSON.stringify([]),
    })
    .into('budget');
}
