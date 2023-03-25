import { authenticateUserContainer } from '@main/di/inversify.config';
import { AuthenticateUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/authenticateuser/authenticateuser.usecase';
import { AuthMiddleware } from '../authentication/authmiddleware';
import { BaseMiddleware } from '../middlewares/base.middleware';

export const authMiddlewareFactory = (): BaseMiddleware => {
  const authenticateUseCase = authenticateUserContainer.get<AuthenticateUserUsecaseInterface>('AuthenticateUserUsecaseInterface');
  return new AuthMiddleware(authenticateUseCase);
};
