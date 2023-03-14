import { sendOtpContainer } from '@main/di/inversify.config';
import { expressRouteAdapter } from '@main/shared/adapters/expressroute.adapter';
import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/sendotp.usecase';
import { Router } from 'express';
import { ValidationComposite } from '@main/shared/validations/ValidationComposite';
import { RequiredFieldValidation } from '@main/shared/validations/RequiredFieldValidation';
import { SendOtpController } from '../controllers/otp_controller/sentotp.controller';

export default function UserAuthenticationRoutes(router:Router): void {
  router.post('/userauthentication/sendotp', expressRouteAdapter(new SendOtpController(new ValidationComposite([
    new RequiredFieldValidation('USER_PHONE'),
  ], 'body'), sendOtpContainer.get<SendOtpUsecaseInterface>('SendOtpUsecaseInterface'))));
}
