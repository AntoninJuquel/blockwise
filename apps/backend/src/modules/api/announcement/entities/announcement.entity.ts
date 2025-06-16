import { Residence } from 'src/modules/api/residence/entities/residence.entity';
import { User } from 'src/modules/api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Announcement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Residence, (r) => r.announcements)
  residence: Residence;

  @ManyToOne(() => User, (u) => u.announcements)
  author: User;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn()
  postedAt: Date;
}
