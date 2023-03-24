import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';

export interface LoginUserUsecaseInterface extends
  UseCase<LoginUserUsecaseInterface.Request, LoginUserUsecaseInterface.Response> {
  execute(loginUserData: LoginUserUsecaseInterface.Request):
  Promise<LoginUserUsecaseInterface.Response>;

}

export namespace LoginUserUsecaseInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME' >;
  export type Response = { message: string, acctok: string } | UnauthorizedError;
}
