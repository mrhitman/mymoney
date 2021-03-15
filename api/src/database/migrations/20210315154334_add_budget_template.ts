import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('user_budget_templates', (t) => {
    t.string('id').primary();
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.string('description').notNullable();
    t.jsonb('outcomes').defaultTo([]);
    t.jsonb('incomes').defaultTo([]);
    t.jsonb('savings').defaultTo([]);
    t.string('currency_id').references('id').inTable('currencies');
    t.boolean('active').defaultTo(false);
    t.timestamp('last_sync');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('user_categories');
}

