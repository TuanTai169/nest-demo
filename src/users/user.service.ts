import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  findAll() {
    return this.userRepository.find();
  }

  async findUserById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ id });
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ email });
  }

  async register(body: any) {
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
        role,
        password: hashPassword,
      });

      this.userRepository.save(newUser);
      return {
        message: 'Register successfully',
      };
    }
  }

  async update(id: number, updateUser: User): Promise<any> {
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
    if (!deletedUser.affected) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
