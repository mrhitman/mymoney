import { createApp } from '../server';
import agent from 'supertest-koa-agent';

describe('Currencies', () => {
  let app;

  beforeEach(() => {
    app = agent(createApp());
  });

  it('get list', async () => {
    const response = await app.get('/currencies');

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty('success');
    expect(response.body).toHaveProperty('rates');
    expect(response.body.success).toBeTruthy();
  });
});
