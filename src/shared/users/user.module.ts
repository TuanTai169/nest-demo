import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../db/entity/user.entity';
import { Post } from '../../db/entity/post.entity';
import { Profile } from '../../db/entity/profile.entity';
import { Genre } from '../../db/entity/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post, Genre])],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
