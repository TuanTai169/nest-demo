import { IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('user_profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  firstName: string;

  @Column()
  @IsString()
  lastName: string;

  @Column()
  age: number;

  @Column()
  dob: string;
}
