import { createApp } from '../server';
import agent from 'supertest-koa-agent';
import chance from 'chance';

describe('Budgets, ', () => {
  let app;

  beforeAll(() => {
    app = agent(createApp());
  });

  it('get list', async () => {
    const response = await app.get('/budgets');

    expect(response.status).toEqual(200);
  });

  it('create', async () => {
    const response = await app.post('/budgets').send({ id: chance().guid() });

    expect(response.status).toEqual(200);
  });
});
