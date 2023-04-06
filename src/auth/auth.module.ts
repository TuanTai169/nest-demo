import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { UserModule } from '../shared/users/user.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

import { LocalStrategy } from './strategy/local.strategy';
import { JsonWebTokenStrategy } from './strategy/jwt.strategy';
import { RefreshTokenStrategy } from './strategy/refresh.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiredIn },
    }),
  ],
  providers: [AuthService, LocalStrategy, JsonWebTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
