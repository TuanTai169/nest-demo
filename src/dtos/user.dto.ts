import { Post } from 'src/db/entity/post.entity';
import { Profile } from 'src/db/entity/profile.entity';
import { Role } from './../enums/role.enum';

export class CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role?: Role;
}

export class UpdateUserDto {
  fullName?: string;
  email?: string;
  password?: string;
  role?: Role;
  profile?: Profile;
  posts?: Post[];
  refreshToken?: string;
  refreshTokenExp?: string;
}

export class CurrentUserDto {
  id: number;
  fullName: string;
  email: string;
  password?: string;
  role: Role;
  profile?: Profile;
  posts?: Post[];
  refreshToken?: string;
  refreshTokenExp?: string;
}

export class CreateUserProfileDto {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
}
