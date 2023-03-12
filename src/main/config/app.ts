import express, { Express } from 'express';
import SetupMiddlewares from './middlewares/middlewares';
import SetupRoutes from './routes';

export default function SetupApp(): Express {
  const app = express();
  SetupMiddlewares(app);
  SetupRoutes(app);
  return app;
}
