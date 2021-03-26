import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('audit', t => {
    t.increments('id').primary();
    t.integer('user_id').references('id').inTable('user').onDelete('CASCADE');
    t.string('operation').notNullable();
    t.string('ip').notNullable();
    t.jsonb('peer');
    t.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('audit');
}

