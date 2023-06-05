import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { AuthenticateUserUsecaseInterface } from '../interfaces/usecases_interface/authenticateuser.usecase';
import { UserAuthenticationRepositoryInterface } from '../interfaces/repositories_interface/userauthentication.repository';

@injectable()
export class AuthenticateUserUsecase implements AuthenticateUserUsecaseInterface {
  userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface;

  constructor(
  @inject('UserAuthenticationRepositoryInterface') userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface,
  ) {
    this.userAuthenticationRepositoryInterface = userAuthenticationRepositoryInterface;
  }

  async execute(authenticateUserData: AuthenticateUserUsecaseInterface.Request):
  Promise<AuthenticateUserUsecaseInterface.Response> {
    return this.userAuthenticationRepositoryInterface.authenticateUser({ ...authenticateUserData });
  }
}
