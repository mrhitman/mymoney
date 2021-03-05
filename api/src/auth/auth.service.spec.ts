import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { Chance } from 'chance';
import { DatabaseModule } from 'src/database/database.module';
import { config } from 'src/config';

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
      providers: [
        {
          provide: 'KnexConnection',
          useFactory: async () => {
            return jest.fn().mockImplementation();
          },
        },
        AuthService,
        UsersService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe(' register User', () => {
    it(' successfully', async () => {
      const chance = new Chance();
      const firstName = chance.name();
      const email = chance.email();
      const user = await service.register({
        firstName,
        email,
        password: chance.word(),
        imageUrl: '',
        additional: {},
      });

      expect(user).toBeDefined();
      expect(user.firstName).toBe(firstName);
      expect(user.email).toBe(email);
    });
  });
});
