import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import bcrypt from 'bcryptjs';
import { Chance } from 'chance';
import { config } from 'src/config';
import { DatabaseModule } from 'src/database/database.module';
import Category from 'src/database/models/category.model';
import RefreshToken from 'src/database/models/refresh-token.model';
import UserCategory from 'src/database/models/user-category.model';
import User from 'src/database/models/user.model';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const chance = new Chance(42);
  const userData = {
    firstName: chance.name(),
    email: chance.email(),
    password: chance.word({ length: 10 }),
    imageUrl: '',
    additional: {},
  };

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

  describe(' login', () => {
    beforeEach(async () => {
      const password = await bcrypt.hash(userData.password, 10);

      (<jest.Mock>RefreshToken.query).mockImplementation(() => ({
        delete: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
      }));
      (<jest.Mock>User.query).mockImplementation(() => ({
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockReturnValue({
          id: 1,
          ...userData,
          password,
        }),
        findById: jest.fn().mockImplementation((id) => {
          return {
            '1': {
              id: 1,
              ...userData,
              password,
            },
          }[id.toString()];
        }),
      }));
    });

    it(' validate user, exists', async () => {
      const user = await service.validateUser(
        userData.email,
        userData.password,
      );
      expect(user).toBeDefined();
      expect(user).not.toHaveProperty('password');
      expect(user).toMatchSnapshot();
    });

    it(' validate user, not exists', async () => {
      const user = await service.validateUser(
        userData.email,
        chance.word({ length: 10 }),
      );
      expect(user).not.toBeDefined();
    });

    it(' get user, exists', async () => {
      const user = await service.getUser(1);
      expect(user).toBeDefined();
      expect(user).not.toHaveProperty('password');
      expect(user).toMatchSnapshot();
    });

    it(' get user, not exists', async () => {
      const user = await service.getUser(2);
      expect(user).not.toBeDefined();
    });

    it(' login, success', async () => {
      const user = await service.getUser(1);
      const response = await service.login(user, <RefreshToken>{
        userId: 1,
        token: chance.guid(),
      });
      expect(response.accessToken).toBeDefined();
      expect(response.refreshToken).toBeDefined();
    });

    it(' login, success, clear old session', async () => {
      const stub = jest.fn();
      (<jest.Mock>RefreshToken.query).mockImplementation(() => ({
        delete: stub.mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        insert: jest.fn().mockReturnThis(),
      }));
      const user = await service.getUser(1);
      await service.login(user);
      expect(stub).toHaveBeenCalled();
    });
  });

  describe(' logout', () => {
    it(' clear refresh token for user', async () => {
      const stub = jest.fn();
      (<jest.Mock>RefreshToken.query).mockImplementation(() => ({
        delete: stub.mockReturnThis(),
        where: stub.mockReturnThis(),
      }));

      const user = await service.getUser(1);
      await service.logout(user as User);
      expect(stub).toBeCalledWith({ userId: 1 });
    });
  });

  describe(' register User', () => {
    beforeEach(() => {
      (<jest.Mock>User.query).mockImplementation(() => ({
        findOne: jest.fn().mockReturnValue(null),
        insert: jest.fn().mockReturnValue({ id: 1, ...userData }),
      }));
      (<jest.Mock>UserCategory.query).mockImplementation(() => ({
        where: jest.fn().mockReturnThis(),
        insert: jest
          .fn()
          .mockReturnValue([
            { id: 1, name: 'test_category', type: 'income', userId: 1 },
          ]),
        count: jest.fn().mockReturnValue([{ count: 0 }]),
      }));
      (<jest.Mock>Category.query).mockImplementation(() => [
        {
          id: 1,
          name: 'test_category',
          type: 'income',
          codes: [],
          icon: {},
          isFixed: false,
        },
      ]);
    });

    it(' user created', async () => {
      const user = await service.register(userData);
      expect(user).toBeDefined();
      expect(user.firstName).toBe(userData.firstName);
      expect(user.email).toBe(userData.email);
      expect(user).toMatchSnapshot();
    });

    it(' user-categories created', async () => {
      const stab = jest.fn();
      (<jest.Mock>UserCategory.query).mockImplementation(() => ({
        where: jest.fn().mockReturnThis(),
        insert: stab.mockReturnValue([
          { id: 1, name: 'test_category', type: 'income', userId: 1 },
        ]),
        count: jest.fn().mockReturnValue([{ count: 0 }]),
      }));
      const user = await service.register(userData);
      expect(user).toBeDefined();
      expect(user.firstName).toBe(userData.firstName);
      expect(user.email).toBe(userData.email);
      expect(user).toMatchSnapshot();
      expect(stab).toBeCalledWith([
        {
          categoryId: 1,
          codes: [],
          icon: {},
          id: 'RANDOM_GENERETED_UUID_V4:40',
          isFixed: false,
          name: 'test_category',
          type: 'income',
          userId: 1,
        },
      ]);
    });

    it(' user-categories not created (test user with exists, predefined categories)', async () => {
      const stab = jest.fn();
      (<jest.Mock>UserCategory.query).mockImplementation(() => ({
        where: jest.fn().mockReturnThis(),
        insert: stab,
        count: jest.fn().mockReturnValue([{ count: 1 }]),
      }));
      const user = await service.register(userData);
      expect(user).toBeDefined();
      expect(user.firstName).toBe(userData.firstName);
      expect(user.email).toBe(userData.email);
      expect(user).toMatchSnapshot();
      expect(stab).not.toBeCalled();
    });

    it(' failed, user already exists', async () => {
      (<jest.Mock>User.query).mockImplementation(() => ({
        findOne: jest.fn().mockReturnValue({ id: 1, ...userData }),
      }));
      await expect(
        service.register(userData),
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  it(' change password', async () => {
    const stab = jest.fn();
    (<jest.Mock>User.query).mockImplementation(() => ({
      update: jest.fn().mockReturnThis(),
      where: stab.mockReturnThis(),
    }));
    const password = chance.word({ length: 10 });
    await service.changePassword({ id: 1 } as User, password);
    expect(stab).toBeCalled();
  });
});
