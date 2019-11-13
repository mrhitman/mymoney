import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('users', t => {
    t.increments('id').primary();
    t.string('first_name');
    t.string('middle_name');
    t.string('last_name');
    t.string('email').unique();
    t.string('password');
    t.jsonb('settings').defaultTo('{}');
    t.timestamp('last_sync');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('users');
}
