import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { AuthenticateUserRepositoryInterface } from '../../interfaces/repositories_interface/authenticateuser/authenticateuser.repository';
import { AuthenticateUserUsecaseInterface } from '../../interfaces/usecases_interface/authenticateuser/authenticateuser.usecase';

@injectable()
export class AuthenticateUserUsecase implements AuthenticateUserUsecaseInterface {
  authenticateUserRepositoryInterface: AuthenticateUserRepositoryInterface;

  constructor(
  @inject('AuthenticateUserRepositoryInterface') authenticateUserRepositoryInterface: AuthenticateUserRepositoryInterface,
  ) {
    this.authenticateUserRepositoryInterface = authenticateUserRepositoryInterface;
  }

  async execute(authenticateUserData: AuthenticateUserRepositoryInterface.Request):
  Promise<AuthenticateUserRepositoryInterface.Response> {
    return this.authenticateUserRepositoryInterface.authenticateUser(authenticateUserData);
  }
}
