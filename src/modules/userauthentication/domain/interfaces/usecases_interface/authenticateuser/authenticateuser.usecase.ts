import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { ForbiddenError } from '@modules/userauthentication/domain/errors/authenticate_error/ForbiddenError';

export interface AuthenticateUserUsecaseInterface extends
  UseCase<AuthenticateUserUsecaseInterface.Request, AuthenticateUserUsecaseInterface.Response> {
  execute(authenticateUserData: AuthenticateUserUsecaseInterface.Request):
  Promise<AuthenticateUserUsecaseInterface.Response>;

}

export namespace AuthenticateUserUsecaseInterface {
  export type Request = string;
  export type Response = string | ForbiddenError;
}
