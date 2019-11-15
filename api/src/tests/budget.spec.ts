import { createApp } from '../server';
import agent from 'supertest-koa-agent';
import chance from 'chance';
import jwtHelper from './helpers/jwt';

describe('Budgets, ', () => {
  let app;

  beforeAll(() => {
    app = agent(createApp());
  });

  it('get list', async () => {
    const jwt = jwtHelper({ id: 1 }, { expiresIn: '1h' });
    const response = await app.get('/budgets').set('Authorization', jwt);

    expect(response.status).toEqual(200);
  });

  it('create', async () => {
    const jwt = jwtHelper({ id: 1 }, { expiresIn: '1h' });
    const response = await app
      .post('/budgets')
      .set('Authorization', jwt)
      .send({
        id: chance().guid(),
        currency_id: new chance(0).guid(),
        incomes: [
          {
            id: chance().guid(),
            category_id: chance().guid(),
            currency_id: new chance(0).guid(),
            goal: 10000,
            progress: chance().natural({ max: 1000 }),
          },
        ],
        outcomes: [
          {
            id: chance().guid(),
            category_id: chance().guid(),
            currency_id: new chance(0).guid(),
            goal: 10000,
            progress: chance().natural({ max: 1000 }),
          },
        ],
      });

    expect(response.status).toEqual(200);
  });

  it('create, fail', async () => {
    const jwt = jwtHelper({ id: 1 }, { expiresIn: '1h' });
    const response = await app
      .post('/budgets')
      .set('Authorization', jwt)
      .send({
        id: chance().guid(),
        currency_id: new chance(0).guid(),
        incomes: [
          {
            id: chance().guid(),
            category_id: chance().guid(),
            currency_id: new chance(0).guid(),
            goal_fail: 10000,
            progress: chance().natural({ max: 1000 }),
          },
        ],
      });

    expect(response.status).toEqual(400);
  });
});
