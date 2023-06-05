import { sl } from '@main/di/inversify.config';
import { BaseController } from '@main/shared/controllers/basecontroller';
import { RequiredFieldValidation } from '@main/shared/validations/RequiredFieldValidation';
import { ValidationComposite } from '@main/shared/validations/ValidationComposite';
import { RegisterUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/registeruser.usecase';
import { RegisterUserController } from '../controllers/registeruser.controller';

export const registerUserFactory = (): BaseController => {
  const validation = new ValidationComposite(
    [
      new RequiredFieldValidation('USER_FULLNAME'),
      new RequiredFieldValidation('USER_PHONE'),
      new RequiredFieldValidation('USER_EMAIL'),
    ],
    'body',
  );
  const useCase = sl.get<RegisterUserUsecaseInterface>('RegisterUserUsecaseInterface');
  return new RegisterUserController(validation, useCase);
};
