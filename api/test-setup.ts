import UserCategory from 'src/database/models/user-category.model';
import User from 'src/database/models/user.model';

const queryMock = {
  findOne: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
  where: jest.fn(),
  count: jest.fn(),
};

jest.mock('src/database/models/user.model', () => ({
  query: jest.fn(() => queryMock),
}));

jest.mock('src/database/models/user-category.model', () => ({
  query: jest.fn(() => queryMock),
}));

export default {
  User,
  UserCategory,
};
