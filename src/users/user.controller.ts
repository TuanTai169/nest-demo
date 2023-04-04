import { RolesGuard } from 'src/guard/roles.guard';
import { UserService } from './user.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
  Body,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { User } from '../db/entity/user.entity';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorator/roles.decorator';
import { CreateUserProfileDto, UpdateUserDto } from './../dtos/user.dto';
import { CreatePostDto } from './../dtos/post.dto';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthenticationGuard, RolesGuard)
  @Roles(Role.Admin)
  getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @UseGuards(AuthenticationGuard)
  @Get(':id')
  async findUserById(@Param() params): Promise<User> {
    return this.userService.findUserById(params.id);
  }

  @UseGuards(AuthenticationGuard)
  @Put('/update/:id')
  async update(@Param() params, @Body() updateUser: UpdateUserDto): Promise<any> {
    return this.userService.update(params.id, updateUser);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.userService.delete(+id);
  }

  @Post(':id/profile')
  createUserProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserProfileDto: CreateUserProfileDto,
  ) {
    return this.userService.createUserProfile(id, createUserProfileDto);
  }

  @Post(':id/posts')
  createUserPosts(@Param('id', ParseIntPipe) id: number, @Body() postDto: CreatePostDto) {
    return this.userService.createUserPosts(id, postDto);
  }
}
