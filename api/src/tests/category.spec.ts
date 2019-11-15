import { createApp } from '../server';
import agent from 'supertest-koa-agent';
import chance from 'chance';
import jwtHelper from './helpers/jwt';

describe('Categories, ', () => {
  let app;

  beforeAll(() => {
    app = agent(createApp());
  });

  it('get list', async () => {
    const jwt = jwtHelper({ id: 1 }, { expiresIn: '1h' });
    const response = await app.get('/categories').set('Authorization', jwt);

    expect(response.status).toEqual(200);
  });

  it('create', async () => {
    const jwt = jwtHelper({ id: 1 }, { expiresIn: '1h' });
    const response = await app
      .post('/categories')
      .set('Authorization', jwt)
      .send({
        id: chance().guid(),
        name: chance().word(),
        type: chance().word(),
      });

    expect(response.status).toEqual(200);
  });
});
