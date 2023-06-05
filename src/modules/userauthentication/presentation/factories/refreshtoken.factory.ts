import { sl } from '@main/di/inversify.config';
import { BaseController } from '@main/shared/controllers/basecontroller';
import { RequiredFieldValidation } from '@main/shared/validations/RequiredFieldValidation';
import { ValidationComposite } from '@main/shared/validations/ValidationComposite';
import { RefreshTokenUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/refreshtoken.usecase';
import { RefreshTokenController } from '../controllers/refreshtoken.controller';

export const refreshTokenFactory = (): BaseController => {
  const validation = new ValidationComposite(
    [
      new RequiredFieldValidation('USER_REFRESHTOKEN'),
    ],
    'body',
  );
  const useCase = sl.get<RefreshTokenUsecaseInterface>('RefreshTokenUsecaseInterface');
  return new RefreshTokenController(validation, useCase);
};
