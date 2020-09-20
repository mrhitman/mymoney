import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  knex.schema.alterTable('bank_connectors', (t) => {
    t.string('description', 191);
  });
}

export async function down(knex: Knex): Promise<any> {
  knex.schema.alterTable('bank_connectors', (t) => {
    t.dropColumn('description');
  });
}
