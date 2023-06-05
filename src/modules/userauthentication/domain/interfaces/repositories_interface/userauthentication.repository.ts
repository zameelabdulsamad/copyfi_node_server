import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';
import { SendingOtpError } from '../../errors/SendingOtpError';
import { IncorrectOtpError } from '../../errors/IncorrectOtpError';
import { RegisterUserError } from '../../errors/RegisterUserError';
import { UnauthorizedError } from '../../errors/UnauthorizedError';
import { VerifyingOtpError } from '../../errors/VerifyingOtpError';
import { InvalidTokenError } from '../../errors/tokeninvalid.error';
import { RefreshTokenGenerationError } from '../../errors/refreshtokengeneration.error';
import { InvalidRefreshTokenError } from '../../errors/refreshtokeninvalid.error';

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

  refreshToken(
    refreshTokenData: UserAuthenticationRepositoryInterface.RefreshTokenRequest
  ): Promise<UserAuthenticationRepositoryInterface.RefreshTokenResponse>;
}

export namespace UserAuthenticationRepositoryInterface {
  // SendOtp
  export type SendOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_REFRESHTOKEN'>;
  export type SendOtpResponse = { message: string } | SendingOtpError;

  // VerifyOtp
  export type VerifyOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_REFRESHTOKEN'> & { otp: string };
  export type VerifyOtpResponseDataType = Partial<{
    refreshToken: string;
    token: string;
    userAlreadyRegistered: boolean;
  }>;
  export type VerifyOtpResponse = { message: string, data: VerifyOtpResponseDataType } |
  VerifyingOtpError | IncorrectOtpError | UnauthorizedError;

  // RegisterUser
  export type RegisterUserRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_REFRESHTOKEN'>;
  export type RegisterUserResponseDataType = {
    userFullname:string;
    userEmail:string;
    userPhone:string;
    token:string
    refreshToken:string;
  };
  export type RegisterUserResponse = { message: string; data: RegisterUserResponseDataType } |
  PhoneInUseError | RegisterUserError;

  // AuthenticateUser
  export type AuthenticateUserRequest = { token:string };
  export type AuthenticateUserResponseDataType = {
    uid:string;
  };
  export type AuthenticateUserResponse =
   { message: string; data: AuthenticateUserResponseDataType }
   | InvalidTokenError;

  // RefreshTokenUser
  export type RefreshTokenRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_PHONE'>;
  export type RefreshTokenResponseDataType = {
    token:string
    refreshToken:string;
  };
  export type RefreshTokenResponse = { message: string; data: RefreshTokenResponseDataType }
  | RefreshTokenGenerationError | InvalidRefreshTokenError;
}
