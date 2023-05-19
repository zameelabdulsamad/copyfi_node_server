import { sl } from '@main/di/inversify.config';
import { BaseController } from '@main/shared/controllers/basecontroller';
import { RequiredFieldValidation } from '@main/shared/validations/RequiredFieldValidation';
import { ValidationComposite } from '@main/shared/validations/ValidationComposite';
import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/sendotp.usecase';
import { SendOtpController } from '../../controllers/otp_controller/sentotp.controller';

export const sendOtpFactory = (): BaseController => {
  const validation = new ValidationComposite(
    [
      new RequiredFieldValidation('USER_PHONE'),
    ],
    'body',
  );
  const useCase = sl.get<SendOtpUsecaseInterface>('SendOtpUsecaseInterface');
  return new SendOtpController(validation, useCase);
};
