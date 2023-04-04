import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entity/user.entity';
import { Post } from '../db/entity/post.entity';
import { Profile } from '../db/entity/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile, Post])],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
