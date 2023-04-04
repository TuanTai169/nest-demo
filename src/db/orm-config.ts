import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entity/user.entity';
import { Profile } from './entity/profile.entity';
import { Post } from './entity/post.entity';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'nest_demo_db',
  // entities: ['dist/db/entity/*.entity{.ts,.js}'],
  entities: [User, Profile, Post],
  synchronize: true,
  migrations: ['dist/db/migrations/*{.ts,.js}'],
};

const dataSource = new DataSource(ormConfig);
export default dataSource;
