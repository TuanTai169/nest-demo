import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from './db/orm-config';

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forRoot(ormConfig)],
})
export class AppModule {}
