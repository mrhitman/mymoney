import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('users', (t) => {
    t.increments('id').primary();
    t.string('first_name');
    t.string('middle_name');
    t.string('last_name');
    t.string('email').unique();
    t.string('password');
    t.jsonb('settings').defaultTo('{}');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at');
    t.timestamp('deleted_at');
    t.timestamp('sync_at');
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('users');
}
