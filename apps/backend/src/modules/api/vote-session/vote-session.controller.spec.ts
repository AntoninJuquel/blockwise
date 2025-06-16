import { Test, TestingModule } from '@nestjs/testing';
import { VoteSessionController } from './vote-session.controller';
import { VoteSessionService } from './vote-session.service';

describe('VoteSessionController', () => {
  let controller: VoteSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoteSessionController],
      providers: [VoteSessionService],
    }).compile();

    controller = module.get<VoteSessionController>(VoteSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
