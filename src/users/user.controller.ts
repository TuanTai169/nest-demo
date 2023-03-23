import { RolesGuard } from 'src/guard/roles.guard';
import { UserService } from './user.service';
import {
  Controller,
  Request,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
  Body,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthenticationGuard } from 'src/guard/auth.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorator/roles.decorator';

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
  async update(@Param() params, @Body() updateUser: User): Promise<any> {
    return this.userService.update(params.id, updateUser);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.userService.delete(+id);
  }
}
