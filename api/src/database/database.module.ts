import { Global, Module } from '@nestjs/common';
import Knex from 'knex';
import { knexSnakeCaseMappers, Model } from 'objection';

const providers = [
  {
    provide: 'KnexConnection',
    useFactory: async () => {
      const knex = Knex({
        client: 'postgres',
        connection: process.env.DATABASE_URL,
        debug: process.env.KNEX_DEBUG === 'true',
        pool: {
          min: 2,
          max: 32,
        },
        ...knexSnakeCaseMappers(),
      });

      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
