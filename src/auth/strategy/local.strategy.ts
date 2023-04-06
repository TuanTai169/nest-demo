import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { CurrentUserDto } from 'src/dtos/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<CurrentUserDto> {
    const user = await this.authService.authentication(email, password);

    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { id: user.id, email: user.email, fullName: user.fullName, role: user.role };
  }
}
