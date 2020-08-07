import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('bank_connectors', t => {
        t.increments('id').primary();
        t.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        t.string('type').notNullable();
        t.boolean('enabled');
        t.jsonb('meta').defaultTo('{}');
        t.timestamp('connected_at').defaultTo(knex.fn.now());
        t.timestamp('created_at').defaultTo(knex.fn.now());
    });
    await knex.schema.alterTable('users', t => {
        t.dropColumn('connections')
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable('bank_connectors');
    await knex.schema.alterTable('users', t => {
        t.jsonb('connections').defaultTo([]);
    });
}

