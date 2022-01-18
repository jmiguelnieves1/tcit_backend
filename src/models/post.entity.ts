/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', name: 'name', length: 255 })
  name: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @Column({ type: 'character varying', name: 'status', length: 20, default: 'Active' })
  status: string;

  @Column('timestamp without time zone', {
    name: 'creation_date',
    select: true,
    default: () => 'CURRENT_TIMESTAMP',
  })
  creationDate: Date;
}
