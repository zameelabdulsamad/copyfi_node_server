import { log } from 'console';
import { appDataSource } from './ormconfig';

export const ConnectDb = () => {
  return new Promise<void>((resolve:any, reject:any) => {
    appDataSource.initialize()
      .then(() => {
        log('Connected to postgresDB', appDataSource.options.database);
        resolve();
      })
      .catch((error) => {
        log('Error acquiring client', error);
        reject(error);
      });
  });
};
