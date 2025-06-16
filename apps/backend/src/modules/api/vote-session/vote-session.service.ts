import { Injectable } from '@nestjs/common';
import { CreateVoteSessionDto } from './dto/create-vote-session.dto';
import { UpdateVoteSessionDto } from './dto/update-vote-session.dto';

@Injectable()
export class VoteSessionService {
  create(createVoteSessionDto: CreateVoteSessionDto) {
    return 'This action adds a new voteSession';
  }

  findAll() {
    return `This action returns all voteSession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} voteSession`;
  }

  update(id: number, updateVoteSessionDto: UpdateVoteSessionDto) {
    return `This action updates a #${id} voteSession`;
  }

  remove(id: number) {
    return `This action removes a #${id} voteSession`;
  }
}
