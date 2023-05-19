import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';

import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';

import { ForbiddenError } from '@modules/userauthentication/domain/errors/ForbiddenError';
import { SendingOtpError } from '../../errors/SendingOtpError';
import { IncorrectOtpError } from '../../errors/IncorrectOtpError';
import { RegisterUserError } from '../../errors/RegisterUserError';
import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { VerifyingOtpError } from '../../errors/VerifyingOtpError';

export interface UserAuthenticationRepositoryInterface {
  sendOtp(sendOtpData: UserAuthenticationRepositoryInterface.SendOtpRequest
  ): Promise<UserAuthenticationRepositoryInterface.SendOtpResponse>;

  verifyOtp(verifyOtpData: UserAuthenticationRepositoryInterface.VerifyOtpRequest
  ): Promise<UserAuthenticationRepositoryInterface.VerifyOtpResponse>;

  registerUser(registerUserData: UserAuthenticationRepositoryInterface.RegisterUserRequest
  ): Promise<UserAuthenticationRepositoryInterface.RegisterUserResponse>;

  authenticateUser(
    authenticateUserData: UserAuthenticationRepositoryInterface.AuthenticateUserRequest
  ): Promise<UserAuthenticationRepositoryInterface.AuthenticateUserResponse>;
}

export namespace UserAuthenticationRepositoryInterface {
  // SendOtp
  export type SendOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type SendOtpResponse = { message: string } | SendingOtpError;

  export type VerifyOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'> & { otp: string };
  export type VerifyOtpResponse = { message: string, data: any } |
  VerifyingOtpError | IncorrectOtpError | UnauthorizedError;

  export type RegisterUserRequest = Omit<UserEntityInterface, 'USER_UID'>;
  export type RegisterUserResponse = { message: string; data: any } |
  PhoneInUseError | RegisterUserError | UnauthorizedError;

  // AuthenticateUser
  export type AuthenticateUserRequest = string;
  export type AuthenticateUserResponse = string | ForbiddenError;
}
