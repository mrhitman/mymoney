import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { Chance } from 'chance';
import { DatabaseModule } from 'src/database/database.module';
import { config } from 'src/config';
import { User } from 'src/database/models/user.model';
import { UserCategory } from 'src/database/models/user-category.model';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
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
    it(' successfully', async () => {
      const chance = new Chance(42);
      const userData = {
        firstName: chance.name(),
        email: chance.email(),
        password: chance.word({ length: 10 }),
        imageUrl: '',
        additional: {},
      };

      jest.spyOn(User, 'query').mockImplementation(() => {
        return {
          findOne: jest.fn().mockReturnValue(null),
          insert: jest.fn().mockReturnValue({ id: 1, ...userData }),
        } as any;
      });
      jest.spyOn(UserCategory, 'query').mockImplementation(() => {
        return {
          where: jest.fn().mockReturnThis(),
          count: jest.fn().mockReturnValue([{ count: 0 }]),
        } as any;
      });
      const user = await service.register(userData);
      expect(user).toBeDefined();
      expect(user.firstName).toBe(userData.firstName);
      expect(user.email).toBe(userData.email);
      expect(user).toMatchSnapshot();
    });
  });
});
