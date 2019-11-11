import dotenv from 'dotenv';
import Knex from 'knex';

dotenv.config();

const db = Knex({
  client: 'postgres',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 32,
  },
});

export default db;
