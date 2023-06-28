import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Board')
export class BoardEntity {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 1000 })
  content: string;

  @Column()
  userId: number;

  @Column()
  author: string;
}
