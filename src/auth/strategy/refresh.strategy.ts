import { Injectable, BadRequestException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';

import { jwtConstants } from '../constants';
import { UserService } from 'src/shared/users/user.service';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private readonly userSerVice: UserService) {
    super({
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: jwtConstants.secret,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const secretData = req?.cookies['auth-cookie'];
          if (!secretData) return null;
          return secretData.token;
        },
      ]),
    });
  }

  async validate(req: Request, payload: any) {
    if (!payload) {
      throw new BadRequestException('Invalid token');
    }

    const secretData = req?.cookies['auth-cookie'];
    if (!secretData?.refreshToken) throw new BadRequestException('Invalid refresh token');

    const user = await this.userSerVice.validRefreshToken(payload.email, secretData.refreshToken);

    if (!user) {
      throw new BadRequestException('Token expired');
    }

    return user;
  }
}
