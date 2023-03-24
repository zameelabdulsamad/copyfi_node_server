import { loginUserContainer } from '@main/di/inversify.config';
import { BaseController } from '@main/shared/controllers/basecontroller';
import { RequiredFieldValidation } from '@main/shared/validations/RequiredFieldValidation';
import { ValidationComposite } from '@main/shared/validations/ValidationComposite';
import { LoginUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/loginuser/loginuser.usecase';
import { LoginUserController } from '../../controllers/loginuser_controller/loginuser.controller';

export const loginUserFactory = (): BaseController => {
  const validation = new ValidationComposite(
    [
      new RequiredFieldValidation('USER_PHONE'),
    ],
    'body',
  );
  const useCase = loginUserContainer.get<LoginUserUsecaseInterface>('LoginUserUsecaseInterface');
  return new LoginUserController(validation, useCase);
};
