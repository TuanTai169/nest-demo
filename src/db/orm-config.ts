import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entity/user.entity';
import { Profile } from './entity/profile.entity';
import { Post } from './entity/post.entity';
import { Genre } from './entity/genre.entity';
import { join } from 'path';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'nest_demo_db',
  // entities: [join(process.cwd(), 'src/db/entity/*.entity{.ts,.js}')],
  entities: [User, Profile, Post, Genre],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['src/db/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(ormConfig);
export default dataSource;
