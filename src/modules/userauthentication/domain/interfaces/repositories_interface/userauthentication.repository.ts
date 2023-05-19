import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/otp_error/SendingOtpError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/register_error/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/register_error/RegisterUserError';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';
import { ForbiddenError } from '@modules/userauthentication/domain/errors/authenticate_error/ForbiddenError';
import { IncorrectOtpError } from '../../errors/otp_error/IncorrectOtpError';

export interface UserAuthenticationRepositoryInterface {
  sendOtp(sendOtpData: UserAuthenticationRepositoryInterface.SendOtpRequest
  ): Promise<UserAuthenticationRepositoryInterface.SendOtpResponse>;

  verifyOtp(verifyOtpData: UserAuthenticationRepositoryInterface.VerifyOtpRequest
  ): Promise<UserAuthenticationRepositoryInterface.VerifyOtpResponse>;

  registerUser(registerUserData: UserAuthenticationRepositoryInterface.RegisterUserRequest
  ): Promise<UserAuthenticationRepositoryInterface.RegisterUserResponse>;

  loginUser(loginUserData: UserAuthenticationRepositoryInterface.LoginUserRequest
  ): Promise<UserAuthenticationRepositoryInterface.LoginUserResponse>;

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
  VerifyingOtpError | IncorrectOtpError;
  export type RegisterUserRequest = Omit<UserEntityInterface, 'USER_UID'>;
  export type RegisterUserResponse = { message: string; data: any } |
  PhoneInUseError | RegisterUserError;
  // LoginUser
  export type LoginUserRequest = Omit<UserEntityInterface, 'USER_UID' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME' >;
  export type LoginUserResponse = { message: string, acctok: string } | UnauthorizedError;
  // AuthenticateUser
  export type AuthenticateUserRequest = string;
  export type AuthenticateUserResponse = string | ForbiddenError;
}
