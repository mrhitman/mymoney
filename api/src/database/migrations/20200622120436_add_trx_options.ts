import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.alterTable('transactions', (t) => {
    t.jsonb('template').nullable();
    t.boolean('is_template').notNullable().defaultTo(false);
    t.boolean('is_necessary').notNullable().defaultTo(false);
    t.boolean('is_auto_generated').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.alterTable('transactions', (t) => {
    t.dropColumn('is_template');
    t.dropColumn('template');
    t.dropColumn('is_necessary');
    t.dropColumn('is_auto_generated');
  });
}
