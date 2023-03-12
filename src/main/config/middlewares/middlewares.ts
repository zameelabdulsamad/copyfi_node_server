import { bodyParser } from '@main/config/middlewares/bodyparser';
import { contentType } from '@main/config/middlewares/contenttype';
import { Express } from 'express';

const cors = require('@main/middlewares/cors');

export default function SetupMiddlewares(app: Express): void {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
}
