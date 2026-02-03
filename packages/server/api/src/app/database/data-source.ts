import { DataSource } from 'typeorm';
import { ProjectEntity } from '../projects/project.entity';
import { FlowEntity } from '../flows/flow.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'yflow',
  entities: [ProjectEntity, FlowEntity],
  migrations: ['packages/server/api/src/migrations/*.ts'],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});
