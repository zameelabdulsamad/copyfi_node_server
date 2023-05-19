import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { LoginUserUsecaseInterface } from '../../interfaces/usecases_interface/loginuser/loginuser.usecase';
import { UserAuthenticationRepositoryInterface } from '../../interfaces/repositories_interface/userauthentication.repository';

@injectable()
export class LoginUserUsecase implements LoginUserUsecaseInterface {
  userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface;

  constructor(
  @inject('UserAuthenticationRepositoryInterface') userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface,
  ) {
    this.userAuthenticationRepositoryInterface = userAuthenticationRepositoryInterface;
  }

  async execute(loginUserData: LoginUserUsecaseInterface.Request):
  Promise<LoginUserUsecaseInterface.Response> {
    return this.userAuthenticationRepositoryInterface.loginUser({
      ...loginUserData,
    });
  }
}
