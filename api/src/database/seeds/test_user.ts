/* eslint-disable @typescript-eslint/camelcase */

import bcrypt from 'bcrypt';
import * as Knex from 'knex';
import { defaultCategories } from 'common/utils/categories';

export async function seed(knex: Knex): Promise<any> {
  return knex('users')
    .del()
    .then(() => knex('categories').del())
    .then(() => bcrypt.hash('1', 10))
    .then((password) => {
      return knex('users').insert({
        first_name: 'TEST',
        last_name: 'USER',
        email: 'admin@admin.com',
        password,
      });
    })
    .then(() =>
      knex
        .select(['id'])
        .from('users')
        .where({ email: 'admin@admin.com' })
        .first(),
    )
    .then(({ id }: { id: number }) => {
      return Promise.all(
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
    });
}
