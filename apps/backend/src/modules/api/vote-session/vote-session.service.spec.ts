import { Test, TestingModule } from '@nestjs/testing';
import { VoteSessionService } from './vote-session.service';

describe('VoteSessionService', () => {
  let service: VoteSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteSessionService],
    }).compile();

    service = module.get<VoteSessionService>(VoteSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
