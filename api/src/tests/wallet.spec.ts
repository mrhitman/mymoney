import { createApp } from '../server';
import agent from 'supertest-koa-agent';
import chance from 'chance';

describe('Wallets, ', () => {
  let app;

  beforeAll(() => {
    app = agent(createApp());
  });

  it('create, success', async () => {
    const response = await app.post('/wallets').send({
      id: chance().guid(),
      name: chance().name(),
      type: chance().word({ length: 8 }),
      pockets: [
        {
          id: chance().guid(),
          currency_id: chance().guid(),
          amount: chance().natural({ max: 10000 }),
        },
        {
          id: chance().guid(),
          currency_id: chance().guid(),
          amount: chance().natural({ max: 10000 }),
        },
      ],
    });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('last_sync');
  });

  it('create, invalid pocket', async () => {
    const response = await app.post('/wallets').send({
      id: chance().guid(),
      name: chance().name(),
      type: chance().word(),
      pockets: [
        {
          id: chance().guid(),
          currency_id: chance().guid(),
          amounts: chance().natural({ max: 10000 }),
        },
      ],
    });

    expect(response.status).toEqual(400);
  });
});
