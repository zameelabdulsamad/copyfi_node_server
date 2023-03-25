import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';
import { LoginUserRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/loginuser/loginuser.repository';
import { GenerateTokenJwtAdapterInterface } from '../../interfaces/externaladapter_interface/jwt/generatetoken.jwtadapter';
import { LoginUserPGDBDataHandlerInterface } from '../../interfaces/datasource_interface/pgdb/datahandlers/login/loginuser.datahandler';

@injectable()
export class LoginUserRepository implements LoginUserRepositoryInterface {
  generateTokenJwtAdapterInterface: GenerateTokenJwtAdapterInterface;

  loginUserPGDBDataHandlerInterface: LoginUserPGDBDataHandlerInterface;

  constructor(
  @inject('GenerateTokenJwtAdapterInterface') generateTokenJwtAdapterInterface: GenerateTokenJwtAdapterInterface,

    @inject('LoginUserPGDBDataHandlerInterface') loginUserPGDBDataHandlerInterface: LoginUserPGDBDataHandlerInterface,

  ) {
    this.generateTokenJwtAdapterInterface = generateTokenJwtAdapterInterface;

    this.loginUserPGDBDataHandlerInterface = loginUserPGDBDataHandlerInterface;
  }

  async loginUser(loginUserData: LoginUserRepositoryInterface.Request):
  Promise<LoginUserRepositoryInterface.Response> {
    const getUserUIDResult = await this.loginUserPGDBDataHandlerInterface.getUserUID(loginUserData);

    if (getUserUIDResult instanceof UnauthorizedError) {
      return getUserUIDResult;
    }
    const generateTokenResult = await this.generateTokenJwtAdapterInterface.generateToken(
      getUserUIDResult,
    );

    if (generateTokenResult instanceof UnauthorizedError) {
      return generateTokenResult;
    }

    return {
      message: 'User logged in',
      acctok: generateTokenResult.acctok,
    };
  }
}
