import { sendOtpContainer } from '@main/di/inversify.config';
import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/sendotp.usecase';
import UserAuthenticationRoutes from '@modules/userauthentication/presentation/routers/userauthentication.routes';
import { Express, Router } from 'express';

export default function SetupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);

  UserAuthenticationRoutes(
    router,
    sendOtpContainer.get<SendOtpUsecaseInterface>('SendOtpUsecaseInterface'),
  );
}
