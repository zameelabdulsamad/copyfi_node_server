import 'module-alias/register';
import env from '@main/config/env';
import { ConnectDb } from './db/postgreSQL/connection';
import SetupApp from './config/app';

ConnectDb()
  .then(async () => {
    const app = SetupApp();
    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is running on port ${env.port}`);
    });
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
