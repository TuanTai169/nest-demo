import { Role } from './../enums/role.enum';

export class CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  role?: Role;
}

export class UpdateUserDto {
  fullName: string;
  email: string;
  password: string;
  role?: Role;
}

export class CreateUserProfileDto {
  firstName: string;
  lastName: string;
  age: number;
  dob: string;
}
