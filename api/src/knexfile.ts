import { config } from './config';
import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';

export = {
  test: {
    ...config.db,
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
