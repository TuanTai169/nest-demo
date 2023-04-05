import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from '../../db/entity/genre.entity';
import { Post } from 'src/db/entity/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre, Post])],
  exports: [GenreService],
  providers: [GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
