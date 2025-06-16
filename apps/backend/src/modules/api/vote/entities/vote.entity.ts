import { User } from 'src/modules/api/user/entities/user.entity';
import { VoteSession } from 'src/modules/api/vote-session/entities/vote-session.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum VoteValue {
  YES = 'yes',
  NO = 'no',
  ABSTAIN = 'abstain',
}

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => VoteSession, (session) => session.votes)
  session: VoteSession;

  @ManyToOne(() => User)
  voter: User;

  @Column({ type: 'enum', enum: VoteValue })
  value: VoteValue;

  @Column({ default: 1 })
  weight: number;

  @CreateDateColumn()
  votedAt: Date;
}
