import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it.skip('should be defined', () => {
    expect(service).toBeDefined();
  });
});
