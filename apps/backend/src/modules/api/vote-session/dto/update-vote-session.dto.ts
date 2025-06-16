import { PartialType } from '@nestjs/swagger';
import { CreateVoteSessionDto } from './create-vote-session.dto';

export class UpdateVoteSessionDto extends PartialType(CreateVoteSessionDto) {}
