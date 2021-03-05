import { config } from './config';
import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

const database = {
  test: {
    ...config.db,
    charset: 'utf8',
    migrations: {
      extension: 'ts',
      directory: 'database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      extension: 'ts',
      directory: 'seeds',
      tableName: 'seeds',
    },
  },
  development: {
    ...config.db,
    migrations: {
      extension: 'ts',
      directory: 'database/migrations',
      tableName: 'migrations',
    },
    seeds: {
      extension: 'ts',
      directory: 'database/seeds',
      tableName: 'seeds',
    },
  },
  ...knexSnakeCaseMappers(),
} as Knex.Config;

export = database;
