import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { TokenGenerationError } from '@modules/userauthentication/domain/errors/tokengeneration.error';
import { InvalidTokenError } from '@modules/userauthentication/domain/errors/tokeninvalid.error';

export interface JwtExternalAdapterInterface {
  generateToken(
    generateTokenData: JwtExternalAdapterInterface.GenerateTokenRequest
  ): Promise<JwtExternalAdapterInterface.GenerateTokenResponse>;

  verifyToken(
    verifyTokenData: JwtExternalAdapterInterface.VerifyTokenRequest
  ): Promise<JwtExternalAdapterInterface.VerifyTokenResponse>;

}

export namespace JwtExternalAdapterInterface {
  export type GenerateTokenRequest = Omit<UserEntityInterface, 'USER_PHONE' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_REFRESHTOKEN' >;
  export type GenerateTokenResponseDataType = {
    refreshToken: string;
    token: string;
  };
  export type GenerateTokenResponse = { data:GenerateTokenResponseDataType } | TokenGenerationError;

  export type VerifyTokenRequest = { token: string };
  export type VerifyTokenResponseDataType = {
    userUid: string;
  };
  export type VerifyTokenResponse = { data:VerifyTokenResponseDataType } | InvalidTokenError;
}
