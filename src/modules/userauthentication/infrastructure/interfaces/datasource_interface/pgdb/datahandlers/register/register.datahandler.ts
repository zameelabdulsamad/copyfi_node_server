import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/register_error/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/register_error/RegisterUserError';

export interface RegisterUserPGDBDataHandlerInterface {
  registerUser(
    registerUserData: RegisterUserPGDBDataHandlerInterface.Request
  ): Promise<RegisterUserPGDBDataHandlerInterface.Response>;
}

export namespace RegisterUserPGDBDataHandlerInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'otp'>;
  export type Response = { message: string } | PhoneInUseError | RegisterUserError;
}
