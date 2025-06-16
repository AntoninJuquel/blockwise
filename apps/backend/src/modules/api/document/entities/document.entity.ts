import { Residence } from 'src/modules/api/residence/entities/residence.entity';
import { User } from 'src/modules/api/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum DocumentAccess {
  PUBLIC = 'public',
  PRIVATE = 'private',
  BOARD_ONLY = 'board_only',
}

export enum DocumentType {
  PV = 'pv',
  CONVOCATION = 'convocation',
  CONTRACT = 'contract',
}

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Residence, (r) => r.documents)
  residence: Residence;

  @ManyToOne(() => User, { nullable: true })
  uploadedBy: User;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ type: 'enum', enum: DocumentType })
  type: DocumentType;

  @Column({
    type: 'enum',
    enum: DocumentAccess,
    default: DocumentAccess.PUBLIC,
  })
  access: DocumentAccess;

  @CreateDateColumn()
  createdAt: Date;
}
