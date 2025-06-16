import { Residence } from 'src/modules/api/residence/entities/residence.entity';
import { Vote } from 'src/modules/api/vote/entities/vote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class VoteSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Residence, (r) => r.votes)
  residence: Residence;

  @Column()
  title: string;

  @Column({ default: false })
  isOpen: boolean;

  @Column({ nullable: true })
  closesAt: Date;

  @OneToMany(() => Vote, (v) => v.session)
  votes: Vote[];

  @CreateDateColumn()
  createdAt: Date;
}
