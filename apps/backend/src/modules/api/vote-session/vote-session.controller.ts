import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VoteSessionService } from './vote-session.service';
import { CreateVoteSessionDto } from './dto/create-vote-session.dto';
import { UpdateVoteSessionDto } from './dto/update-vote-session.dto';

@Controller('vote-session')
export class VoteSessionController {
  constructor(private readonly voteSessionService: VoteSessionService) {}

  @Post()
  create(@Body() createVoteSessionDto: CreateVoteSessionDto) {
    return this.voteSessionService.create(createVoteSessionDto);
  }

  @Get()
  findAll() {
    return this.voteSessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.voteSessionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVoteSessionDto: UpdateVoteSessionDto,
  ) {
    return this.voteSessionService.update(+id, updateVoteSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.voteSessionService.remove(+id);
  }
}
