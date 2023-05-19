import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/register_error/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/register_error/RegisterUserError';

export interface UserAuthenticationPGDBDataHandlerInterface {
  getUserUID(
    loginUserData: UserAuthenticationPGDBDataHandlerInterface.LoginUserRequest
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.LoginUserResponse>;

  checkUserExist(
    verifyOtpData: UserAuthenticationPGDBDataHandlerInterface.VerifyOtpRequest
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.VerifyOtpResponse>;

  registerUser(
    registerUserData: UserAuthenticationPGDBDataHandlerInterface.RegisterUserRequest
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.RegisterUserResponse>;
}

export namespace UserAuthenticationPGDBDataHandlerInterface {
  export type LoginUserRequest = Omit<UserEntityInterface, 'USER_UID' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type LoginUserResponse = Omit<UserEntityInterface, 'USER_PHONE' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME'> | UnauthorizedError;

  export type VerifyOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type VerifyOtpResponse = { data: any } | VerifyingOtpError;

  export type RegisterUserRequest = Omit<UserEntityInterface, 'USER_UID' | 'otp'>;
  export type RegisterUserResponse = { message: string; data: any } | PhoneInUseError |
  RegisterUserError;
}
