import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { DatabaseAccessError } from '@modules/userauthentication/domain/errors/pgdatabaseaccess.error';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';

export interface UserAuthenticationPGDBDataHandlerInterface {
  getUserUID(
    getUserUIDData: UserAuthenticationPGDBDataHandlerInterface.GetUserUIDRequest
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.GetUserUIDResponse>;

  checkUserExist(
    verifyOtpData: UserAuthenticationPGDBDataHandlerInterface.CheckUserExistRequest
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.CheckUserExistResponse>;

  registerUser(
    registerUserData: UserAuthenticationPGDBDataHandlerInterface.RegisterUserRequest
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.RegisterUserResponse>;

  saveRefreshToken(
    saveRefreshTokenData: UserAuthenticationPGDBDataHandlerInterface.SaveRefreshTokenRequest
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.SaveRefreshTokenResponse>;

  getRefreshToken(
    getRefreshTokenData: UserAuthenticationPGDBDataHandlerInterface.GetRefreshTokenRequest
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.GetRefreshTokenResponse>;
}

export namespace UserAuthenticationPGDBDataHandlerInterface {
  // GetUserUID
  export type GetUserUIDRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_REFRESHTOKEN'>;
  export type GetUserUIDResponseDataType = {
    userUid:string;
  };
  export type GetUserUIDResponse = { data: GetUserUIDResponseDataType } | DatabaseAccessError;

  // CheckUserExist
  export type CheckUserExistRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_REFRESHTOKEN'>;
  export type CheckUserExistResponseDataType = {
    userAlreadyRegistered:boolean;
  };
  export type CheckUserExistResponse = { data: CheckUserExistResponseDataType }
  | DatabaseAccessError;

  // RegisterUser
  export type RegisterUserRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_REFRESHTOKEN'>;
  export type RegisterUserResponseDataType = {
    userFullname:string;
    userEmail:string;
    userPhone:string;
    userUid:string;
  };
  export type RegisterUserResponse = { data: RegisterUserResponseDataType } | PhoneInUseError |
  DatabaseAccessError;

  // SaveRefreshToken
  export type SaveRefreshTokenRequest = Omit<UserEntityInterface, 'USER_PHONE' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type SaveRefreshTokenResponse = { success: boolean } | DatabaseAccessError;

  export type GetRefreshTokenRequest = Omit<UserEntityInterface, 'USER_PHONE' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_REFRESHTOKEN' >;
  export type GetRefreshTokenResponseDataType = {
    refreshToken:string;
  };
  export type GetRefreshTokenResponse = { data: GetRefreshTokenResponseDataType }
  | DatabaseAccessError;
}
