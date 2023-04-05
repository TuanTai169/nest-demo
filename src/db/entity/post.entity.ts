import { IsNotEmpty, IsString } from 'class-validator';
import { User } from './user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Genre } from './genre.entity';

@Entity('posts')
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'post_id' })
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

  @ManyToMany(() => Genre, (genre) => genre.posts, { eager: false, cascade: true })
  genres: Genre[];
}
