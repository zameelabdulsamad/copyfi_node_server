import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';

export interface LoginUserPGDBDataHandlerInterface {
  getUserUID(
    loginUserData: LoginUserPGDBDataHandlerInterface.Request
  ): Promise<LoginUserPGDBDataHandlerInterface.Response>;
}

export namespace LoginUserPGDBDataHandlerInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type Response = Omit<UserEntityInterface, 'USER_PHONE' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME'> | UnauthorizedError;
}
