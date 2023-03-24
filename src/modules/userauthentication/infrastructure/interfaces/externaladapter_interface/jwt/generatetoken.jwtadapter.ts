import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';

export interface GenerateTokenJwtAdapterInterface {
  generateToken(
    generateTokenData: GenerateTokenJwtAdapterInterface.Request
  ): Promise<GenerateTokenJwtAdapterInterface.Response>;
}

export namespace GenerateTokenJwtAdapterInterface {
  export type Request = Omit<UserEntityInterface, 'USER_PHONE' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME' >;
  export type Response = { acctok: string } | UnauthorizedError;
}
