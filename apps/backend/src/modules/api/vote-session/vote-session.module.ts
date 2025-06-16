import { Module } from '@nestjs/common';
import { VoteSessionService } from './vote-session.service';
import { VoteSessionController } from './vote-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteSession } from './entities/vote-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoteSession])],
  controllers: [VoteSessionController],
  providers: [VoteSessionService],
})
export class VoteSessionModule {}
