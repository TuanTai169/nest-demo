import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './user.entity';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsString()
  description: string;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: User;
}
