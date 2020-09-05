import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('categories', (t) => {
    t.string('id').primary();
    t.string('parent').index();
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
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
  await knex.schema.createTable('currencies', (t) => {
    t.string('id').primary();
    t.string('name');
    t.integer('code');
    t.string('description');
    t.string('symbol');
    t.string('flagCode');
  });
  await knex.schema.createTable('wallets', (t) => {
    t.string('id').primary();
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.string('name', 64);
    t.string('description', 64);
    t.string('card_number', 64);
    t.string('type', 32);
    t.jsonb('pockets').defaultTo([]);
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at');
    t.timestamp('deleted_at');
    t.timestamp('sync_at');
  });
  await knex.schema.createTable('goals', (t) => {
    t.string('id').primary();
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.string('wallet_id').references('id').inTable('wallets').onDelete('CASCADE');
    t.string('currency_id').references('id').inTable('currencies');
    t.decimal('goal');
    t.decimal('progress');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at');
    t.timestamp('deleted_at');
    t.timestamp('sync_at');
  });
  await knex.schema.createTable('transactions', (t) => {
    t.string('id').primary();
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.string('category_id').references('id').inTable('categories');
    t.string('currency_id').references('id').inTable('currencies');
    t.string('source_wallet_id').references('id').inTable('wallets').onDelete('CASCADE');
    t.string('destination_wallet_id').references('id').inTable('wallets').onDelete('CASCADE');
    t.decimal('fine');
    t.decimal('amount');
    t.string('type');
    t.string('description');
    t.jsonb('additional').defaultTo('{}');
    t.timestamp('date');
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at');
    t.timestamp('deleted_at');
    t.timestamp('sync_at');
  });
  await knex.schema.createTable('budgets', (t) => {
    t.string('id').primary();
    t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    t.jsonb('outcomes').defaultTo([]);
    t.jsonb('incomes').defaultTo([]);
    t.jsonb('savings').defaultTo([]);
    t.string('currency_id').references('id').inTable('currencies');
    t.boolean('active').defaultTo(true);
    t.date('date');
    t.date('deadline');
    t.timestamp('last_sync');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('transactions');
  await knex.schema.dropTable('goals');
  await knex.schema.dropTable('wallets');
  await knex.schema.dropTable('categories');
  await knex.schema.dropTable('budgets');
  await knex.schema.dropTable('currencies');
}
