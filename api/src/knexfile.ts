import { config } from 'dotenv';
import * as knex from 'knex';

config({ path: '../.env' });

const database = {
  test: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    charset: 'utf8',
    migrations: {
      extension: 'ts',
      directory: 'migrations',
      tableName: 'migrations',
    },
    seeds: {
      extension: 'ts',
      directory: 'seeds',
      tableName: 'seeds',
    },
  },
  development: {
    client: 'postgres',
    connection: process.env.DATABASE_URL,
    migrations: {
      extension: 'ts',
      directory: 'migrations',
      tableName: 'migrations',
    },
    seeds: {
      extension: 'ts',
      directory: 'seeds',
      tableName: 'seeds',
    },
  },
  pool: {
    min: 2,
    max: 16,
  },
  timezone: 'UTC',
} as knex.Config;

export = database;
