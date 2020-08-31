import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.alterTable('users', (t) => {
    t.string('image_url');
    t.jsonb('additional').defaultTo('{}');
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.alterTable('users', (t) => {
    t.dropColumn('image_url');
    t.dropColumn('additional');
  });
}
