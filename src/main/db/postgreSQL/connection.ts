import { log } from 'console';
import { Pool } from 'pg';
import env from '@main/config/env';

const credentials: any = {
  user: env.postgresConfig.postgresDbUser,
  host: env.postgresConfig.postgresDbHost,
  database: env.postgresConfig.postgresDb,
  password: env.postgresConfig.postgresDbPassword,
  port: env.postgresConfig.postgresDbPort,
};

const pool = new Pool(credentials);

export const ConnectDb = () => {
  return new Promise<void>((resolve:any, reject:any) => {
    pool.connect((err, client, _release) => {
      if (err) {
        log('Error acquiring client', err.stack);
        reject(err.stack);
      }
      log('Connected to', credentials.database);
      resolve(client);
    });
  });
};
