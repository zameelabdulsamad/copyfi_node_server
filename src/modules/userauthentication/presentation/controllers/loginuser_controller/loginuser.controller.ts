import { BaseController } from '@main/shared/controllers/basecontroller';
import { badRequest, ok } from '@main/shared/helpers/http_helper/http.helper';
import { HttpRequest } from '@main/shared/interfaces/http/httprequest';
import { HttpResponse } from '@main/shared/interfaces/http/httpresponse';
import { Validation } from '@main/shared/interfaces/validation/validation';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';
import { LoginUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/loginuser/loginuser.usecase';

export class LoginUserController extends BaseController {
  constructor(
    private readonly loginUserValidation: Validation,
    private readonly loginUserUsecaseInterface: LoginUserUsecaseInterface,
  ) {
    super(loginUserValidation);
  }

  async execute(
    httpRequest: LoginUserController.Request,
  ): Promise<LoginUserController.Response> {
    const { USER_PHONE } = httpRequest.body!;
    const userLoggedInOrError = await this.loginUserUsecaseInterface.execute({
      USER_PHONE,
    });
    if (userLoggedInOrError instanceof UnauthorizedError) {
      return badRequest(userLoggedInOrError);
    }
    return ok(userLoggedInOrError);
  }
}

export namespace LoginUserController {
  export type Request = HttpRequest<LoginUserUsecaseInterface.Request>;
  export type Response = HttpResponse<LoginUserUsecaseInterface.Response>;
}
