import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { InvalidTokenError } from '../../errors/tokeninvalid.error';

export interface AuthenticateUserUsecaseInterface extends
  UseCase<AuthenticateUserUsecaseInterface.Request, AuthenticateUserUsecaseInterface.Response> {
  execute(authenticateUserData: AuthenticateUserUsecaseInterface.Request):
  Promise<AuthenticateUserUsecaseInterface.Response>;

}

export namespace AuthenticateUserUsecaseInterface {
  export type Request = { token: string };
  export type ResponseDataType = {
    uid:string;
  };
  export type Response =
  { message: string; data: ResponseDataType }
  | InvalidTokenError;
}
