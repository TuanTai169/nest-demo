import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/db/entity/user.entity';
import { UserService } from '../shared/users/user.service';
import { CreateUserDto, CurrentUserDto } from './../dtos/user.dto';

import * as bcrypt from 'bcrypt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';

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

  // async loginWithCredentials(user: CurrentUserDto) {
  //   const payload = { email: user.email, fullName: user.fullName, role: user.role };
  //   return {
  //     user: { ...payload },
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  async register(user: CreateUserDto) {
    return await this.userService.register(user);
  }

  async getJwtToken(currentUser: CurrentUserDto): Promise<string> {
    const payload = {
      ...currentUser,
    };
    return await this.jwtService.signAsync(payload);
  }

  async getRefreshToken(userId: number): Promise<string> {
    const userDataToUpdate = {
      refreshToken: randomToken.generate(16),
      refreshTokenExp: moment().format('YYYY-MM-DD'),
    };

    await this.userService.update(userId, userDataToUpdate);
    return userDataToUpdate.refreshToken;
  }
}
