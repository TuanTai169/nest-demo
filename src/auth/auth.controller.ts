import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guard/local.guard';
import { AuthenticationGuard } from 'src/common/guard/auth.guard';
import { User } from 'src/db/entity/user.entity';
import { CreateUserDto } from './../dtos/user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authSerVice: AuthService) {}

  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authSerVice.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request): Promise<any> {
    return this.authSerVice.loginWithCredentials(request.user);
  }

  @UseGuards(AuthenticationGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
