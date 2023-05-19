import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/RegisterUserError';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/UnauthorizedError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/VerifyingOtpError';

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
  export type RegisterUserResponse = { data: any } | PhoneInUseError |
  RegisterUserError;
}
