import { Test, TestingModule } from '@nestjs/testing';
import { MonobankController } from './monobank.controller';

describe('Monobank Controller', () => {
  let controller: MonobankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MonobankController],
    }).compile();

    controller = module.get<MonobankController>(MonobankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
