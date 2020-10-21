import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import Image from './Image';
import Representative from './Representative';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'orphanage_id' })
  images: Image[];

  /*@ManyToOne(() => Representative, representative => representative.orphanages, {
    eager: true,
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'representative_id' })
  representative: Representative;*/

  @ManyToOne(() => Representative, (representative: Representative) => representative.orphanages)
  public representative: Representative;
}
