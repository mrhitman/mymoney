import dotenv from 'dotenv';
import Knex from 'knex';
import { Model } from 'objection';

dotenv.config();

const knex = Knex({
  client: 'postgres',
  connection: process.env.DATABASE_URL,
  pool: {
    min: 2,
    max: 32,
  },
});

Model.knex(knex);
export default knex;
