import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.alterTable('wallets', t => {
        t.jsonb('meta').defaultTo('{}');
        t.boolean('is_imported').defaultTo(false);
    });
    await knex.schema.alterTable('transactions', t => {
        t.renameColumn('additional', 'meta');
        t.boolean('is_imported').defaultTo(false);
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.alterTable('wallets', t => {
        t.dropColumn('meta');
        t.dropColumn('is_imported');
    });
    await knex.schema.alterTable('transactions', t => {
        t.renameColumn('meta', 'additional');
        t.dropColumn('is_imported');
    });
}

