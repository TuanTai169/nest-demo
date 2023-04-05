import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './db/orm-config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './shared/users/user.module';
import { GenreModule } from './shared/genre/genre.module';

@Module({
  imports: [UserModule, AuthModule, GenreModule, TypeOrmModule.forRoot(ormConfig)],
})
export class AppModule {}
