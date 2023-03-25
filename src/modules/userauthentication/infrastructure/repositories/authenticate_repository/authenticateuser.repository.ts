import { AuthenticateUserRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/authenticateuser/authenticateuser.repository';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { VerifyTokenJwtAdapterInterface } from '../../interfaces/externaladapter_interface/jwt/verifytoken.jwtadapter';

@injectable()
export class AuthenticateUserRepository implements AuthenticateUserRepositoryInterface {
  verifyTokenJwtAdapterInterface: VerifyTokenJwtAdapterInterface;

  constructor(
  @inject('VerifyTokenJwtAdapterInterface') verifyTokenJwtAdapterInterface: VerifyTokenJwtAdapterInterface,
  ) {
    this.verifyTokenJwtAdapterInterface = verifyTokenJwtAdapterInterface;
  }

  async authenticateUser(authenticateUserData: AuthenticateUserRepositoryInterface.Request):
  Promise<AuthenticateUserRepositoryInterface.Response> {
    return this.verifyTokenJwtAdapterInterface.verifyToken(authenticateUserData);
  }
}
