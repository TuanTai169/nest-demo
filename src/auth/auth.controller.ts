import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards, Req, Res, Get } from '@nestjs/common';
import { Response } from 'express';

import { LocalAuthGuard } from 'src/common/guard/local.guard';
import { RefreshGuard } from './../common/guard/refresh.guard';
import { CreateUserDto, CurrentUserDto } from './../dtos/user.dto';
import { AuthenticationGuard } from 'src/common/guard/auth.guard';
import { UserService } from 'src/shared/users/user.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authSerVice: AuthService,
    private readonly userSerVice: UserService,
  ) {}

  @Post('register')
  register(@Body() body: CreateUserDto) {
    return this.authSerVice.register(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response): Promise<any> {
    const token = await this.authSerVice.getJwtToken(req.user as CurrentUserDto);
    const refreshToken = await this.authSerVice.getRefreshToken(req.user.id);

    const secretData = {
      token,
      refreshToken,
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return {
      message: 'Login successfully',
      user: req.user,
      token,
    };
  }

  @UseGuards(RefreshGuard)
  @Get('refresh-token')
  async refreshToken(@Req() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authSerVice.getJwtToken(req.user as CurrentUserDto);
    const refreshToken = await this.authSerVice.getRefreshToken(req.user.id);
    const secretData = {
      token,
      refreshToken,
    };
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return {
      message: 'Get refresh token successfully',
    };
  }

  @UseGuards(AuthenticationGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return await this.userSerVice.findUserById(req.userId);
  }
}
