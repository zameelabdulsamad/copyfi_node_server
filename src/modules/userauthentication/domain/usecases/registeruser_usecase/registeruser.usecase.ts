import { injectable, inject } from 'inversify';

import 'reflect-metadata';
import { RegisterUserRepositoryInterface } from '../../interfaces/repositories_interface/registeruser/registeruser.repository';
import { RegisterUserUsecaseInterface } from '../../interfaces/usecases_interface/registeruser/registeruser.usecase';

@injectable()
export class RegisterUserUsecase implements RegisterUserUsecaseInterface {
  registerUserRepositoryInterface: RegisterUserRepositoryInterface;

  constructor(
  @inject('RegisterUserRepositoryInterface') registerUserRepositoryInterface: RegisterUserRepositoryInterface,
  ) {
    this.registerUserRepositoryInterface = registerUserRepositoryInterface;
  }

  async execute(registerUserData: RegisterUserUsecaseInterface.Request):
  Promise<RegisterUserUsecaseInterface.Response> {
    return this.registerUserRepositoryInterface.registerUser({
      ...registerUserData,
    });
  }
}
