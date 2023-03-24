import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/register_error/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/register_error/RegisterUserError';

export interface RegisterUserRepositoryInterface {
  registerUser(
    registerUserData: RegisterUserRepositoryInterface.Request
  ): Promise<RegisterUserRepositoryInterface.Response>;
}

export namespace RegisterUserRepositoryInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'otp'>;
  export type Response = { message: string } | PhoneInUseError | RegisterUserError;
}
