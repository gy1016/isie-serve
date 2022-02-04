import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type UserRoleType = 'admin' | 'editor' | 'ghost';

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number; // 标记为主列，值自动生成

  @Column({ length: 12 })
  username: string;

  @Column({ length: 16 })
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'editor', 'ghost'],
    default: 'ghost',
  })
  role: UserRoleType;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  create_time: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  update_time: Date;
}
