import { Document } from 'src/modules/api/document/entities/document.entity';
import { Incident } from 'src/modules/api/incident/entities/incident.entity';
import { User } from 'src/modules/api/user/entities/user.entity';
import { VoteSession } from 'src/modules/api/vote-session/entities/vote-session.entity';
import { Announcement } from 'src/modules/api/announcement/entities/announcement.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Residence {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  primaryColor: string;

  @OneToMany(() => User, (user) => user.residence)
  users: User[];

  @OneToMany(() => Document, (doc) => doc.residence)
  documents: Document[];

  @OneToMany(() => Incident, (incident) => incident.residence)
  incidents: Incident[];

  @OneToMany(() => VoteSession, (vote) => vote.residence)
  votes: VoteSession[];

  @OneToMany(() => Announcement, (announcement) => announcement.residence)
  announcements: Announcement[];

  @CreateDateColumn()
  createdAt: Date;
}
