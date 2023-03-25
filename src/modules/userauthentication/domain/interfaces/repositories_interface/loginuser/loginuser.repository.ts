import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';

export interface LoginUserRepositoryInterface {
  loginUser(
    loginUserData: LoginUserRepositoryInterface.Request
  ): Promise<LoginUserRepositoryInterface.Response>;
}

export namespace LoginUserRepositoryInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME' >;
  export type Response = { message: string, acctok: string } | UnauthorizedError;
}
