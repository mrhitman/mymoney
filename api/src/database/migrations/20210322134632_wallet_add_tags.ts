import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.alterTable('wallet', t => {
    t.jsonb('tags').defaultTo('[]')
  })
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.alterTable('wallet', t => {
    t.dropColumn('tags');
  })
}

