import { Test, TestingModule } from '@nestjs/testing';
import { Fixer } from './fixer';

describe('Fixer', () => {
  let provider: Fixer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Fixer],
    }).compile();

    provider = module.get<Fixer>(Fixer);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
