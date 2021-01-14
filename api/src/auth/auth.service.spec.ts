import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { Chance } from 'chance';
import { DatabaseModule } from 'src/database/database.module';

process.env.DATABASE_URL = 'postgres://hitman:password@localhost:6432/mymoney';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        JwtModule.register({
          secret: 'test_secret',
          signOptions: { expiresIn: 3600 },
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
      await user.$query().delete();
    });
  });
});
