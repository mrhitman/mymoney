const queryMock = {
  findOne: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
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
