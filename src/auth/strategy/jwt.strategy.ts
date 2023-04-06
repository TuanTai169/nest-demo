import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';

import { Strategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';

@Injectable()
export class JsonWebTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authSerVice: AuthService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => {
          const secretData = req?.cookies['auth-cookie'];
          if (!secretData) return null;
          return secretData.token;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }

    return {
      userId: payload.id,
      email: payload.email,
      fullName: payload.fullName,
      role: payload.role,
    };
  }
}
