import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('wallets_history', t => {
        t.increments('id').primary();
        t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        t.string('wallet_id');
        t.jsonb('pockets');
        t.timestamp('created_at').defaultTo(knex.fn.now());
        t.timestamp('updated_at');
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTableIfExists('wallets_history');
}

