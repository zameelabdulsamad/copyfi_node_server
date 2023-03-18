import { RegisterUserRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/registeruser/registeruser.repository';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { RegisterUserPGDBDataHandlerInterface } from '../../interfaces/datasource_interface/pgdb/datahandlers/register/register.datahandler';

@injectable()
export class RegisterUserRepository implements RegisterUserRepositoryInterface {
  registerUserPGDBDataHandlerInterface: RegisterUserPGDBDataHandlerInterface;

  constructor(
  @inject('RegisterUserPGDBDataHandlerInterface') registerUserPGDBDataHandlerInterface: RegisterUserPGDBDataHandlerInterface,
  ) {
    this.registerUserPGDBDataHandlerInterface = registerUserPGDBDataHandlerInterface;
  }

  async registerUser(registerUserData: RegisterUserRepositoryInterface.Request):
  Promise<RegisterUserRepositoryInterface.Response> {
    return this.registerUserPGDBDataHandlerInterface.registerUser(registerUserData);
  }
}
