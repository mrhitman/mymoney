import * as dotenv from 'dotenv';
import { get, isNull, isUndefined } from 'lodash';

dotenv.config({ path: process.env.PWD + '/.env' });

export function getEnvVariable(name: string, defaultValue?: string) {
  const value = get(process.env, name, defaultValue);

  if (isNull(value) || isUndefined(value)) {
    throw new Error(`Required env variable:${name} isn't set`);
  }

  return value;
}

export const config = {
  app: {
    maxQueryComplexity: parseInt(getEnvVariable('MAX_QUERY_COMPLEXITY', '32')),
    jwt: {
      secret: getEnvVariable('JWT_SECRET'),
      expiresIn: getEnvVariable('JWT_EXPIRES_IN', '10m'),
      ignoreExpiration: Boolean(+getEnvVariable('JWT_IGNORE_EXPIRATION', '0')),
    },
    port: parseInt(getEnvVariable('PORT', '3000'), 10),
    host: getEnvVariable('HOST'),
  },
  mail: {
    type: 'OAuth2',
    user: getEnvVariable('MAIL_USER'),
    clientId: getEnvVariable('MAIL_CLIENT_ID'),
    clientSecret: getEnvVariable('MAIL_SECRET'),
    accessToken: getEnvVariable('MAIL_TOKEN'),
    refreshToken: getEnvVariable('MAIL_REFRESH_TOKEN'),
  },
  db: {
    client: 'postgres',
    connection: {
      connectionString: getEnvVariable('DATABASE_URL'),
      ssl: Boolean(+getEnvVariable('DATABASE_SSL', '1'))
        ? { rejectUnauthorized: false }
        : false,
    },
    timezone: 'UTC',
    charset: 'utf8',
    debug: Boolean(+getEnvVariable('KNEX_DEBUG', '0')),
    pool: {
      min: 2,
      max: 16,
    },
  },
  redis: {
    url: getEnvVariable('REDIS_URL'),
  },
  fixer: {
    apiKey: getEnvVariable('FIXER_API_KEY'),
  },
};

export type Config = typeof config;
