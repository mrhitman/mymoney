import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  knex.schema.alterTable('wallets', (t) => {
    t.string('image').nullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.alterTable('wallets', (t) => {
    t.dropColumn('image');
  });
}
