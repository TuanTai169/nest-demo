import { IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
import { Post } from './post.entity';

@Entity('genre')
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'genre_id' })
  id: number;

  @Column({ unique: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsString()
  // @IsNotEmpty()
  // desc: string;

  @ManyToMany(() => Post, (post) => post.genres, { eager: false })
  @JoinTable({
    name: 'post_genre',
    joinColumn: {
      name: 'post_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'genre_id',
      referencedColumnName: 'id',
    },
  })
  posts: Post[];
}
