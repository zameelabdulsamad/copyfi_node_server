import env from '@main/config/env';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { UserModelEntity } from './DataModelEntity/user.datamodelentity';

export const appDataSource = new DataSource({
  type: 'postgres',
  username: env.postgresConfig.postgresDbUser,
  host: env.postgresConfig.postgresDbHost,
  database: env.postgresConfig.postgresDb,
  password: env.postgresConfig.postgresDbPassword,
  port: 5432,
  entities: [UserModelEntity],
  synchronize: true,
  dropSchema: false,
  migrationsRun: true,
  logging: false,
  logger: 'debug',
  migrations: [join(__dirname, 'src/migration/**/*.ts')],
});
