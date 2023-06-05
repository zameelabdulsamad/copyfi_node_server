import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { UserAuthenticationRepositoryInterface } from '../interfaces/repositories_interface/userauthentication.repository';
import { RefreshTokenUsecaseInterface } from '../interfaces/usecases_interface/refreshtoken.usecase';

@injectable()
export class RefreshTokenUsecase implements RefreshTokenUsecaseInterface {
  userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface;

  constructor(
  @inject('UserAuthenticationRepositoryInterface') userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface,
  ) {
    this.userAuthenticationRepositoryInterface = userAuthenticationRepositoryInterface;
  }

  async execute(refreshTokenData: RefreshTokenUsecaseInterface.Request):
  Promise<RefreshTokenUsecaseInterface.Response> {
    return this.userAuthenticationRepositoryInterface.refreshToken(refreshTokenData);
  }
}
