import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/database/models/user.model';
import { WalletsService } from './wallets.service';
import { Chance } from 'chance';
import Wallet from 'src/database/models/wallet.model';

describe('WalletsService', () => {
  let service: WalletsService;
  let user: User;
  const chance = new Chance(42);
  const userData = {
    id: 1,
    firstName: chance.name(),
    email: chance.email(),
    password: chance.word({ length: 10 }),
    imageUrl: '',
    additional: {},
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    (<jest.Mock>User.query).mockImplementation(() => ({
      where: jest.fn().mockReturnThis(),
      first: jest.fn().mockReturnValue(userData),
      findById: jest.fn().mockImplementation((id) => {
        return {
          '1': { ...userData },
        }[id.toString()];
      }),
    }));
    (<jest.Mock>Wallet.query).mockImplementation(() => ({
      where: jest.fn().mockReturnThis(),
      whereNot: jest.fn().mockReturnValue([
        {
          id: 1,
          name: 'test_wallet',
          userId: 1,
          description: 'test_wallet_desc',
          pockets: [],
        },
      ]),
    }));
    user = await User.query().findById(1);
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletsService],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get all', () => {
    it(' success', async () => {
      const wallets = await service.getAll(user);
      expect(wallets).toMatchSnapshot();
    });
  });
});
