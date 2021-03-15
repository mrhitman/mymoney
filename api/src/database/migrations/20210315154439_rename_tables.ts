import * as Knex from "knex";

const tables = {
  bank_connectors: 'bank_connector',
  budgets: 'budget',
  categories: 'category',
  currencies: 'currency',
  goals: 'goal',
  refresh_tokens: 'refresh_token',
  transactions: 'transaction',
  user_categories: 'user_category',
  users: 'user',
  wallets: 'wallet',
  wallets_history: 'wallet_history',
  user_budget_templates: 'user_budget_template'
}

export async function up(knex: Knex): Promise<any> {
  for (const oldTableName in tables) {
    const newTableName = tables[oldTableName];
    await knex.schema.renameTable(oldTableName, newTableName);
  }
}


export async function down(knex: Knex): Promise<any> {
  for (const oldTableName in tables) {
    const newTableName = tables[oldTableName];
    await knex.schema.renameTable(newTableName, oldTableName);
  }
}

