import { hash, compare } from 'bcrypt';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import Orphanage from './Orphanage';

@Entity('representatives')
export default class Representative {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async encryptPassword() {
    this.password = await hash(this.password, 8);
  }

  @OneToMany(() => Orphanage, (orphanage: Orphanage) => orphanage.representative)
  @JoinColumn({ name: 'representative_id' })
  orphanages: Orphanage[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
