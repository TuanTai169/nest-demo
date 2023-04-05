import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';

import { instanceToInstance } from 'class-transformer';
import { Genre } from 'src/db/entity/genre.entity';
import { Post } from 'src/db/entity/post.entity';
import { CreateGenreDto, UpdateGenreDto } from './../../dtos/genre.dto';
import { validate } from 'class-validator';
@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre) private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.genreRepository.find();
  }

  async findUserById(id: number): Promise<Genre | undefined> {
    const user = await this.genreRepository.findOne({
      where: { id },
    });
    return instanceToInstance(user);
  }

  async create(body: CreateGenreDto) {
    const { name } = body;
    const errors = await validate(body);
    if (errors.length > 0) throw new HttpException('Validation failed!', HttpStatus.BAD_REQUEST);
    else {
      const existedGenre = await this.genreRepository.findOne({ where: { name } });
      if (existedGenre) throw new HttpException('Genre already exists', HttpStatus.BAD_REQUEST);

      const newGenre = this.genreRepository.create({
        name,
      });
      this.genreRepository.save(newGenre);
      return {
        message: 'Genre created successfully',
        genre: newGenre,
      };
    }
  }

  async update(id: number, updateGenre: UpdateGenreDto): Promise<Genre> {
    const errors = await validate(updateGenre);
    if (errors.length > 0) throw new HttpException('Validation failed!', HttpStatus.BAD_REQUEST);
    else {
      const updatedGenre = await this.genreRepository.findOneBy({ id });
      const posts = await this.postRepository.find({ where: { id: In(updateGenre.posts) } });

      for (const post of posts) {
        updatedGenre.posts.push(post);
      }

      if (updatedGenre) {
        return await this.genreRepository.save(updatedGenre);
      }

      throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<any> {
    const deletedGenre = await this.genreRepository.delete(id);
    if (!deletedGenre.affected) throw new HttpException('Genre not found', HttpStatus.BAD_REQUEST);
  }
}
