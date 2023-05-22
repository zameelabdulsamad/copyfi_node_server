import { ForbiddenError } from '@modules/userauthentication/domain/errors/ForbiddenError';
import { AuthenticateUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/authenticateuser/authenticateuser.usecase';
import { AuthTokenNotProvidedError } from '../errors/AuthTokenNotProvidedError';
import { InvalidAuthTokenError } from '../errors/InvalidAuthTokenError';
import { forbidden, ok } from '../helpers/http_helper/http.helper';
import { HttpRequest } from '../interfaces/http/httprequest';
import { HttpResponse } from '../interfaces/http/httpresponse';
import { BaseMiddleware } from '../middlewares/base.middleware';

export class AuthMiddleware extends BaseMiddleware {
  constructor(
    private readonly authenticate: AuthenticateUserUsecaseInterface,
  ) {
    super();
  }

  async execute(httpRequest: AuthMiddleware.Request): Promise<AuthMiddleware.Response> {
    const authHeader = httpRequest.headers?.authorization;
    if (!authHeader) {
      return forbidden(new AuthTokenNotProvidedError());
    }
    const [, authToken] = authHeader.split(' ');
    const userDataOrError = await this.authenticate.execute(authToken);
    if (userDataOrError instanceof ForbiddenError) {
      return forbidden(new InvalidAuthTokenError());
    }
    return ok(userDataOrError);
  }
}

export namespace AuthMiddleware {
  export type Request = HttpRequest<undefined, undefined, { authorization: string }>;
  export type Response =
    HttpResponse<{ userData: string } | AuthTokenNotProvidedError | InvalidAuthTokenError>;
}
