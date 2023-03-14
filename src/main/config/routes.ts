import { SendOtpUsecase } from '@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase';
import { SendOtpTwilioAdapter } from '@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter';
import { SendOtpRepository } from '@modules/userauthentication/infrastructure/repositories/otp_repository/sendotp.repository';
import UserAuthenticationRoutes from '@modules/userauthentication/presentation/routers/userauthentication.routes';
import { Express, Router } from 'express';

export default function SetupRoutes(app: Express): void {
  const router = Router();
  app.use('/api', router);
  UserAuthenticationRoutes(
    router,
    new SendOtpUsecase(new SendOtpRepository(new SendOtpTwilioAdapter())),
  );
}
