import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

export default Knex({
  client: 'postgres',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 32,
  },
});
