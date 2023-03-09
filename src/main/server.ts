import 'module-alias/register';
import setupApp from '@main/config/app';
import env from '@main/config/env';
import { ConnectDb } from './db/postgreSQL/connection';

ConnectDb()
  .then(async () => {
    const app = setupApp();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${env.port}`);
    });
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
