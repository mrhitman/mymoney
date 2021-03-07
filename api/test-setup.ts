const queryMock = {
  findOne: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  where: jest.fn(),
  count: jest.fn(),
};

const models = [
  'bank-connector',
  'budget',
  'category',
  'currency',
  'goal',
  'refresh-token',
  'transaction',
  'user-category',
  'user',
  'wallet-history',
  'wallet',
];

for (const model of models) {
  jest.mock(`src/database/models/${model}.model`, () => ({
    query: jest.fn(() => queryMock),
  }));
}

jest.mock('uuid', () => {
  const stub = jest.fn();

  return {
    v4: stub.mockImplementation(
      () => `RANDOM_GENERETED_UUID_V4:${stub.mock.calls.length}`,
    ),
  };
});

jest.mock('dotenv', () => {
  return {
    config: jest.fn(),
  };
});

process.env = {
  PORT: '4000',
  FIXER_API_KEY: '000000000000000000000000',
  REDIS_URL: 'redis://localhost:6379',
  DATABASE_URL: 'postgres://hitman:password@localhost:5432/mymoney',
  JWT_SECRET: 'secret',
  JWT_EXPIRES_IN: '1h',
  JWT_IGNORE_EXPIRATION: '0',
  KNEX_DEBUG: '0',
  HOST: 'http://localhost:4001',
  MAX_QUERY_COMPLEXITY: '64',
  MAIL_USER: 'kabalx47@gmail.com',
  MAIL_CLIENT_ID: '0000000000000000000000000',
  MAIL_SECRET: '00000000000000000000000',
  MAIL_TOKEN: '000000000000000000000000000000000000',
  MAIL_REFRESH_TOKEN: '00000000000000000',
};
