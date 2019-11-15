import { createApp } from '../server';
import agent from 'supertest-koa-agent';
import chance from 'chance';
import jwtHelper from './helpers/jwt';

describe('Users, ', () => {
  let app;

  beforeAll(() => {
    app = agent(createApp());
  });

  it('get list', async () => {
    const jwt = jwtHelper({ id: 1 }, { expiresIn: '1h' });
    const response = await app.get('/users').set('Authorization', jwt);

    expect(response.status).toEqual(200);
  });

  it('create', async () => {
    const jwt = jwtHelper({ id: 1 }, { expiresIn: '1h' });
    const [first_name, last_name] = chance()
      .name()
      .split(' ');

    const response = await app
      .post('/users')
      .set('Authorization', jwt)
      .send({
        first_name,
        last_name,
        email: chance().email(),
        password: chance().hash(),
      });

    expect(response.status).toEqual(200);
  });
});
