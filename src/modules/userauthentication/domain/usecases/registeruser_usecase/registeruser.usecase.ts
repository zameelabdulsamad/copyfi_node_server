import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { RegisterUserUsecaseInterface } from '../../interfaces/usecases_interface/registeruser/registeruser.usecase';
import { UserAuthenticationRepositoryInterface } from '../../interfaces/repositories_interface/userauthentication.repository';

@injectable()
export class RegisterUserUsecase implements RegisterUserUsecaseInterface {
  userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface;

  constructor(
  @inject('UserAuthenticationRepositoryInterface') userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface,
  ) {
    this.userAuthenticationRepositoryInterface = userAuthenticationRepositoryInterface;
  }

  async execute(registerUserData: RegisterUserUsecaseInterface.Request):
  Promise<RegisterUserUsecaseInterface.Response> {
    return this.userAuthenticationRepositoryInterface.registerUser({
      ...registerUserData,
    });
  }
}
