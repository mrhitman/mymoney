import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Chance } from 'chance';
import { config } from 'src/config';
import { DatabaseModule } from 'src/database/database.module';
import UserCategory from 'src/database/models/user-category.model';
import User from 'src/database/models/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

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

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        JwtModule.register({
          secret: 'test_secret',
          signOptions: { expiresIn: config.app.jwt.expiresIn },
        }),
      ],
      providers: [AuthService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(' register User', () => {
    const chance = new Chance(42);
    const userData = {
      firstName: chance.name(),
      email: chance.email(),
      password: chance.word({ length: 10 }),
      imageUrl: '',
      additional: {},
    };
    beforeEach(() => {
      (<jest.Mock>User.query).mockImplementation(() => ({
        findOne: jest.fn().mockReturnValue(null),
        insert: jest.fn().mockReturnValue({ id: 1, ...userData }),
      }));
      (<jest.Mock>UserCategory.query).mockImplementation(() => ({
        where: jest.fn().mockReturnThis(),
        count: jest.fn().mockReturnValue([{ count: 0 }]),
      }));
    });

    it(' successfully', async () => {
      const user = await service.register(userData);
      expect(user).toBeDefined();
      expect(user.firstName).toBe(userData.firstName);
      expect(user.email).toBe(userData.email);
      expect(user).toMatchSnapshot();
    });
  });
});
