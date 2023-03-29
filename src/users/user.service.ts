import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';

import { CreateUserDto, UpdateUserDto, CreateUserProfileDto } from './../dtos/user.dto';
import { CreatePostDto } from './../dtos/post.dto';

import { User } from '../entity/user.entity';
import { Profile } from '../entity/profile.entity';
import { Post } from 'src/entity/post.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.userRepository.find({ relations: ['profile', 'posts'] });
  }

  async findUserById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id }, relations: ['profile', 'posts'] });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async register(body: CreateUserDto) {
    const { fullName, email, password, role } = body;

    const errors = await validate(body);
    if (errors.length > 0) throw new HttpException('Validation failed!', HttpStatus.BAD_REQUEST);
    else {
      const user = await this.userRepository.findOneBy({ email });
      if (user) throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);

      const saltOrRounds = 10;
      const hashPassword = await bcrypt.hash(password, saltOrRounds);
      const newUser = this.userRepository.create({
        fullName,
        email,
        password: hashPassword,
        role,
      });

      this.userRepository.save(newUser);
      return {
        message: 'Register successfully',
      };
    }
  }

  async update(id: number, updateUser: UpdateUserDto): Promise<any> {
    const errors = await validate(updateUser);
    if (errors.length > 0) throw new HttpException('Validation failed!', HttpStatus.BAD_REQUEST);
    else {
      await this.userRepository.update(id, updateUser);
      const updatedTodo = await this.userRepository.findOneBy({ id });
      if (updatedTodo) {
        return updatedTodo;
      }

      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: number): Promise<any> {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser.affected) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async createUserProfile(
    id: number,
    createUserProfileParams: CreateUserProfileDto,
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found.Cannot create profile', HttpStatus.BAD_REQUEST);

    const newProfile = this.profileRepository.create(createUserProfileParams);
    const saveProfile = await this.profileRepository.save(newProfile);
    user.profile = saveProfile;
    return this.userRepository.save(user);
  }

  async createUserPosts(id: number, postParams: CreatePostDto): Promise<Post> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException('User not found.Cannot create profile', HttpStatus.BAD_REQUEST);

    const newPost = this.postRepository.create({ ...postParams, user });
    return await this.postRepository.save(newPost);
  }
}
