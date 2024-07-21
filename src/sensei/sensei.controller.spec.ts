import { Test, TestingModule } from '@nestjs/testing';
import { SenseiController } from './sensei.controller';

describe('SenseiController', () => {
  let controller: SenseiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SenseiController],
    }).compile();

    controller = module.get<SenseiController>(SenseiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
