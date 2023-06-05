import { BaseController } from '@main/shared/controllers/basecontroller';
import { badRequest, ok } from '@main/shared/helpers/http_helper/http.helper';
import { HttpRequest } from '@main/shared/interfaces/http/httprequest';
import { HttpResponse } from '@main/shared/interfaces/http/httpresponse';
import { Validation } from '@main/shared/interfaces/validation/validation';
import { RefreshTokenGenerationError } from '@modules/userauthentication/domain/errors/refreshtokengeneration.error';
import { InvalidRefreshTokenError } from '@modules/userauthentication/domain/errors/refreshtokeninvalid.error';
import { RefreshTokenUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/refreshtoken.usecase';

export class RefreshTokenController extends BaseController {
  constructor(
    private readonly refreshTokenValidation: Validation,
    private readonly refreshTokenUsecaseInterface: RefreshTokenUsecaseInterface,
  ) {
    super(refreshTokenValidation);
  }

  async execute(
    httpRequest: RefreshTokenController.Request,
  ): Promise<RefreshTokenController.Response> {
    const { USER_REFRESHTOKEN } = httpRequest.body!;
    const newTokenIssuedOrError = await this.refreshTokenUsecaseInterface
      .execute({ USER_REFRESHTOKEN });
    if (newTokenIssuedOrError instanceof RefreshTokenGenerationError
      || newTokenIssuedOrError instanceof InvalidRefreshTokenError) {
      return badRequest(newTokenIssuedOrError);
    }
    return ok({ message: newTokenIssuedOrError.message, data: newTokenIssuedOrError.data });
  }
}

export namespace RefreshTokenController {
  export type Request = HttpRequest<RefreshTokenUsecaseInterface.Request>;
  export type Response = HttpResponse<RefreshTokenUsecaseInterface.Response>;
}
