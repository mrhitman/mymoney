import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.alterTable('wallets', (t) => {
    t.boolean('allow_negative_balance').notNullable().defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.alterTable('wallets', (t) => {
    t.dropColumn('allow_negative_balance');
  });
}
