import { ForbiddenError } from '@modules/userauthentication/domain/errors/authenticate_error/ForbiddenError';

export interface AuthenticateUserRepositoryInterface {
  authenticateUser(
    authenticateUserData: AuthenticateUserRepositoryInterface.Request
  ): Promise<AuthenticateUserRepositoryInterface.Response>;
}

export namespace AuthenticateUserRepositoryInterface {
  export type Request = string;
  export type Response = string | ForbiddenError;
}
