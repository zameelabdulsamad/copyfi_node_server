import { ForbiddenError } from '@modules/userauthentication/domain/errors/authenticate_error/ForbiddenError';

export interface VerifyTokenJwtAdapterInterface {
  verifyToken(
    verifyTokenData: VerifyTokenJwtAdapterInterface.Request
  ): Promise<VerifyTokenJwtAdapterInterface.Response>;
}

export namespace VerifyTokenJwtAdapterInterface {
  export type Request = string;
  export type Response = string | ForbiddenError;
}
