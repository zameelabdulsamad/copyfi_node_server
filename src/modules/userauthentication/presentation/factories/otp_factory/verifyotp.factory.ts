import { sl } from '@main/di/inversify.config';
import { BaseController } from '@main/shared/controllers/basecontroller';
import { RequiredFieldValidation } from '@main/shared/validations/RequiredFieldValidation';
import { ValidationComposite } from '@main/shared/validations/ValidationComposite';
import { VerifyOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/verifyotp.usecase';
import { VerifyOtpController } from '../../controllers/otp_controller/verifyotp.controller';

export const verifyOtpFactory = (): BaseController => {
  const validation = new ValidationComposite(
    [
      new RequiredFieldValidation('otp'),
      new RequiredFieldValidation('USER_PHONE'),

    ],
    'body',
  );
  const useCase = sl.get<VerifyOtpUsecaseInterface>('VerifyOtpUsecaseInterface');
  return new VerifyOtpController(validation, useCase);
};
