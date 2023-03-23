import { UserService } from './../users/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async authentication(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    const check = await bcrypt.compare(password, user.password);

    if (!user || !check) {
      return null;
    }
    return user;
  }

  async loginWithCredentials(user: User) {
    const payload = { email: user.email, fullName: user.fullName, role: user.role };
    return {
      user: { ...payload },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any) {
    return await this.userService.register(user);
  }
}
