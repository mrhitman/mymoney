import * as Knex from "knex";
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<any> {

    return knex('users')
        .del()
        .then(() => bcrypt.hash('1', 10))
        .then((password) => {
            return knex('users').insert({
                first_name: 'TEST',
                last_name: 'USER',
                email: 'admin@admin.com',
                password
            });
        });
}