import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('user_categories', (t) => {
    t.string('id').primary();
    t.string('parent').index();
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.string('category_id').references('id').inTable('categories').onDelete('CASCADE');
    t.string('name');
    t.string('description').defaultTo('');
    t.string('type').defaultTo('outcome');
    t.boolean('is_fixed').defaultTo(false);
    t.jsonb('icon');
    t.jsonb('codes').defaultTo([]);
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at');
    t.timestamp('deleted_at');
    t.timestamp('sync_at');
  });
}


export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('user_categories');
}

