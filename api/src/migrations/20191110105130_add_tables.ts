import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('categories', t => {
    t.uuid('id').primary();
    t.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    t.string('name');
    t.string('type');
    t.jsonb('icon');
    t.timestamp('last_sync');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('currencies', t => {
    t.uuid('id').primary();
    t.string('name');
    t.string('description');
    t.string('symbol');
    t.string('flagCode');
  });
  await knex.schema.createTable('wallets', t => {
    t.uuid('id').primary();
    t.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    t.string('name', 64);
    t.string('description', 64);
    t.string('cardNumber', 64);
    t.string('type', 32);
    t.jsonb('pockets');
    t.timestamp('last_sync');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('goals', t => {
    t.uuid('id').primary();
    t.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    t.uuid('wallet_id')
      .references('id')
      .inTable('wallets')
      .onDelete('CASCADE');
    t.uuid('currency_id')
      .references('id')
      .inTable('currencies');
    t.decimal('goal');
    t.decimal('progress');
    t.timestamp('last_sync');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
  await knex.schema.createTable('transactions', t => {
    t.uuid('id').primary();
    t.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    t.uuid('category_id')
      .references('id')
      .inTable('categories');
    t.uuid('source_wallet_id')
      .references('id')
      .inTable('wallets')
      .onDelete('CASCADE');
    t.uuid('destination_wallet_id')
      .references('id')
      .inTable('wallets')
      .onDelete('CASCADE');
    t.decimal('fine');
    t.decimal('amount');
    t.date('date');
    t.timestamp('last_sync');
    t.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('transactions');
  await knex.schema.dropTable('goals');
  await knex.schema.dropTable('wallets');
  await knex.schema.dropTable('categories');
  await knex.schema.dropTable('currencies');
}
