import { BaseController } from '@main/shared/controllers/basecontroller';
import { badRequest, ok } from '@main/shared/helpers/http_helper/http.helper';
import { HttpRequest } from '@main/shared/interfaces/http/httprequest';
import { HttpResponse } from '@main/shared/interfaces/http/httpresponse';
import { Validation } from '@main/shared/interfaces/validation/validation';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/RegisterUserError';
import { RegisterUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/registeruser.usecase';

export class RegisterUserController extends BaseController {
  constructor(
    private readonly registerUserValidation: Validation,
    private readonly registerUserUsecaseInterface: RegisterUserUsecaseInterface,
  ) {
    super(registerUserValidation);
  }

  async execute(
    httpRequest: RegisterUserController.Request,
  ): Promise<RegisterUserController.Response> {
    const { USER_PHONE, USER_EMAIL, USER_FULLNAME } = httpRequest.body!;
    const userRegisteredOrError = await this.registerUserUsecaseInterface.execute({
      USER_PHONE,
      USER_EMAIL,
      USER_FULLNAME,
    });
    if (userRegisteredOrError instanceof PhoneInUseError
      || userRegisteredOrError instanceof RegisterUserError) {
      return badRequest(userRegisteredOrError);
    }
    return ok({ message: userRegisteredOrError.message, data: userRegisteredOrError.data });
  }
}

export namespace RegisterUserController {
  export type Request = HttpRequest<RegisterUserUsecaseInterface.Request>;
  export type Response = HttpResponse<RegisterUserUsecaseInterface.Response>;
}
