import { Test, TestingModule } from '@nestjs/testing';
import { SenseiService } from './sensei.service';

describe('SenseiService', () => {
  let service: SenseiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SenseiService],
    }).compile();

    service = module.get<SenseiService>(SenseiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
