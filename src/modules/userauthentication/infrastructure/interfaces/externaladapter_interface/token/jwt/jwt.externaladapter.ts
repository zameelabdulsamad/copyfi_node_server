import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { ForbiddenError } from '@modules/userauthentication/domain/errors/authenticate_error/ForbiddenError';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';

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
  export type GenerateTokenResponse = { acctok: string } | UnauthorizedError;

  export type VerifyTokenRequest = string;
  export type VerifyTokenResponse = string | ForbiddenError;
}
