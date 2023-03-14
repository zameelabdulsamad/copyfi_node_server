import UserAuthenticationRoutes from '@modules/userauthentication/presentation/routers/userauthentication.routes';
import { Express, Router } from 'express';

export default function SetupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);

  UserAuthenticationRoutes(router);
}
