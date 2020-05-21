/* eslint-disable @typescript-eslint/camelcase */

import bcrypt from 'bcrypt';
import chance from 'chance';
import { defaultCategories } from 'common/utils/categories';
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  await knex('users').del();
  await knex('categories').del();
  const password = await bcrypt.hash('1', 10);
  const [first_name, middle_name, last_name] = chance()
    .name({ middle_initial: true })
    .split(' ');
  await knex('users').insert({
    first_name,
    middle_name,
    last_name,
    email: 'admin@admin.com',
    password,
  });
  const { id } = await knex
    .select(['id'])
    .from('users')
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
          user_id: id,
        })
        .into('categories'),
    ),
  );
  await knex
    .insert({
      id: chance().guid(),
      user_id: id,
      name: 'TEST_WALLET 1',
      description: 'TEST_DESCRIPTION',
      type: 'fiat',
      pockets: '[]',
    })
    .into('wallets');
  await knex
    .insert({
      id: chance().guid(),
      user_id: id,
      name: 'TEST_WALLET 2',
      description: 'TEST_DESCRIPTION',
      type: 'credit',
      pockets: '[]',
    })
    .into('wallets');
}
