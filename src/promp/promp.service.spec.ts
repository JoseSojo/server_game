import { Test, TestingModule } from '@nestjs/testing';
import { PrompService } from './promp.service';

describe('PrompService', () => {
  let service: PrompService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrompService],
    }).compile();

    service = module.get<PrompService>(PrompService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
