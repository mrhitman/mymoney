/* eslint-disable @typescript-eslint/camelcase */

import bcrypt from 'bcrypt';
import chance from 'chance';
import { defaultCategories } from 'common/src/utils/categories';
import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  await knex('transactions').del();
  await knex('users').del();
  await knex('categories').del();
  await knex('wallets').del();
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
  const wallet1Id = chance().guid();
  const wallet2Id = chance().guid();
  await knex
    .insert({
      id: wallet1Id,
      user_id: id,
      name: 'TEST_WALLET 1',
      description: 'TEST_DESCRIPTION',
      type: 'fiat',
      pockets: JSON.stringify([
        {
          id: chance().guid(),
          amount:
            Math.floor(chance().natural({ min: 2000, max: 6000 }) / 100) * 100,
          currencyId: '096225f7-d38e-5650-8b9f-a19034a5fe6e',
        },
        {
          id: chance().guid(),
          amount:
            Math.floor(chance().natural({ min: 200, max: 600 }) / 100) * 100,
          currencyId: '040864eb-a01d-5660-8b23-d26ab5088233',
        },
      ]),
    })
    .into('wallets');
  await knex
    .insert({
      id: wallet2Id,
      user_id: id,
      name: 'TEST_WALLET 2',
      description: 'TEST_DESCRIPTION',
      type: 'credit',
      pockets: JSON.stringify([
        {
          id: chance().guid(),
          amount:
            Math.floor(chance().natural({ min: 2000, max: 6000 }) / 100) * 100,
          currencyId: '096225f7-d38e-5650-8b9f-a19034a5fe6e',
        },
      ]),
    })
    .into('wallets');

  for (let i = 0; i < 100; i++) {
    await knex
      .insert({
        id: chance().guid(),
        amount: Math.floor(chance().natural({ min: 100, max: 2000 }) / 5) * 5,
        type: 'income',
        date: chance().date({ year: chance().pick([2019, 2020]) }),
        user_id: id,
        destination_wallet_id: chance().pick([wallet1Id, wallet2Id]),
        category_id: chance().pick(
          defaultCategories
            .filter((c) => !['TRANSFER_IN', 'TRANSFER_OUT'].includes(c.name))
            .filter((c) => c.type && c.type === 'income')
            .map((c) => c.id),
        ),
        currency_id: chance().pick([
          '096225f7-d38e-5650-8b9f-a19034a5fe6e',
          '040864eb-a01d-5660-8b23-d26ab5088233',
        ]),
      })
      .into('transactions');

    await knex
      .insert({
        id: chance().guid(),
        amount: Math.floor(chance().natural({ min: 100, max: 2000 }) / 5) * 5,
        type: 'outcome',
        date: chance().date({ year: chance().pick([2019, 2020]) }),
        user_id: id,
        source_wallet_id: chance().pick([wallet1Id, wallet2Id]),
        category_id: chance().pick(
          defaultCategories
            .filter((c) => !['TRANSFER_IN', 'TRANSFER_OUT'].includes(c.name))
            .filter((c) => c.type && c.type === 'outcome')
            .map((c) => c.id),
        ),
        currency_id: chance().pick([
          '096225f7-d38e-5650-8b9f-a19034a5fe6e',
          '040864eb-a01d-5660-8b23-d26ab5088233',
        ]),
      })
      .into('transactions');
  }
}
