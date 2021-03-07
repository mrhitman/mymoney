import { Test, TestingModule } from '@nestjs/testing';
import User from 'src/database/models/user.model';
import { DatabaseModule } from '../database/database.module';
import { CategoriesService } from './categories.service';
import { Chance } from 'chance';
import UserCategory from 'src/database/models/user-category.model';

describe('CategoriesService', () => {
  let service: CategoriesService;
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
    (<jest.Mock>UserCategory.query).mockImplementation(() => ({
      where: jest.fn().mockReturnValue([
        {
          id: 1,
          name: 'test_category',
          userId: 1,
          description: 'test_wallet_desc',
        },
      ]),
    }));
    user = await User.query().findById(1);
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get all', () => {
    it('success, without type', async () => {
      const categories = await service.getAll(user);
      console.log(categories);
    });
  });
});
