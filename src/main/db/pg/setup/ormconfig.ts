import env from '@main/config/env';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { UserDataModelEntity } from '../datamodelentities/user.datamodelentity';
import { PrintJobDataModelEntity } from '../datamodelentities/printjob.datamodelentity';

export const appDataSource = new DataSource({
  type: 'postgres',
  username: env.postgresConfig.postgresDbUser,
  host: env.postgresConfig.postgresDbHost,
  database: env.postgresConfig.postgresDb,
  password: env.postgresConfig.postgresDbPassword,
  port: 5432,
  entities: [UserDataModelEntity, PrintJobDataModelEntity],
  synchronize: true,
  dropSchema: false,
  migrationsRun: true,
  logging: false,
  logger: 'debug',
  migrations: [join(__dirname, 'src/migration/**/*.ts')],
});
