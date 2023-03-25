import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { LoginUserRepositoryInterface } from '../../interfaces/repositories_interface/loginuser/loginuser.repository';
import { LoginUserUsecaseInterface } from '../../interfaces/usecases_interface/loginuser/loginuser.usecase';

@injectable()
export class LoginUserUsecase implements LoginUserUsecaseInterface {
  loginUserRepositoryInterface: LoginUserRepositoryInterface;

  constructor(
  @inject('LoginUserRepositoryInterface') loginUserRepositoryInterface: LoginUserRepositoryInterface,
  ) {
    this.loginUserRepositoryInterface = loginUserRepositoryInterface;
  }

  async execute(loginUserData: LoginUserRepositoryInterface.Request):
  Promise<LoginUserRepositoryInterface.Response> {
    return this.loginUserRepositoryInterface.loginUser({
      ...loginUserData,
    });
  }
}
