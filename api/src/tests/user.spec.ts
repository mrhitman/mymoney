import { createApp } from '../server';
import agent from 'supertest-koa-agent';
import chance from 'chance';

describe('Users, ', () => {
  let app;

  beforeAll(() => {
    app = agent(createApp());
  });

  it('get list', async () => {
    const response = await app.get('/users');

    expect(response.status).toEqual(200);
  });

  it('create', async () => {
    const [first_name, last_name] = chance()
      .name()
      .split(' ');

    const response = await app.post('/users').send({
      first_name,
      last_name,
      email: chance().email(),
      password: chance().hash(),
    });

    expect(response.status).toEqual(200);
  });
});
