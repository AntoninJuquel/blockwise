import { Announcement } from 'src/modules/api/announcement/entities/announcement.entity';
import { Residence } from 'src/modules/api/residence/entities/residence.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  RESIDENT = 'resident',
  BOARD = 'board',
  GUEST = 'guest',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Residence, (r) => r.users)
  residence: Residence;

  @OneToMany(() => Announcement, (a) => a.author)
  announcements: Announcement[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    generatedType: 'STORED',
    asExpression: `"firstName" || ' ' || "lastName"`,
  })
  fullName: string;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.GUEST })
  role: UserRole;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.createdAt = new Date();
  }
}
