import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('refresh_tokens', (t) => {
    t.uuid('token').primary();
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.unique(['user_id', 'token']);
    t.timestamp('expire_at');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('refresh_tokens');
}
