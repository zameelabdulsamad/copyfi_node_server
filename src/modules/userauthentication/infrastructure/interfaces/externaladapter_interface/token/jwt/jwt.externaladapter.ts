import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { ForbiddenError } from '@modules/userauthentication/domain/errors/ForbiddenError';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/UnauthorizedError';

export interface JwtExternalAdapterInterface {
  generateToken(
    generateTokenData: JwtExternalAdapterInterface.GenerateTokenRequest
  ): Promise<JwtExternalAdapterInterface.GenerateTokenResponse>;

  verifyToken(
    verifyTokenData: JwtExternalAdapterInterface.VerifyTokenRequest
  ): Promise<JwtExternalAdapterInterface.VerifyTokenResponse>;
}

export namespace JwtExternalAdapterInterface {
  export type GenerateTokenRequest = Omit<UserEntityInterface, 'USER_PHONE' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME' >;
  export type GenerateTokenResponse = string | UnauthorizedError;

  export type VerifyTokenRequest = string;
  export type VerifyTokenResponse = string | ForbiddenError;
}
