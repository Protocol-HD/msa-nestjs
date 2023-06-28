import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn({ generated: 'increment' })
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column({ length: 60 })
  email: string;

  @Column()
  password: string;

  @Column()
  role: number;
}
