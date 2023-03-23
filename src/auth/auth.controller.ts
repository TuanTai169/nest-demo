import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/local.guard';
import { AuthenticationGuard } from 'src/guard/auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authSerVice: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
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