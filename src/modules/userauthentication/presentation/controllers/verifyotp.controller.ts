import { BaseController } from '@main/shared/controllers/basecontroller';
import { badRequest, ok } from '@main/shared/helpers/http_helper/http.helper';
import { HttpRequest } from '@main/shared/interfaces/http/httprequest';
import { HttpResponse } from '@main/shared/interfaces/http/httpresponse';
import { Validation } from '@main/shared/interfaces/validation/validation';
import { IncorrectOtpError } from '@modules/userauthentication/domain/errors/IncorrectOtpError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/VerifyingOtpError';

import { VerifyOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/verifyotp.usecase';

export class VerifyOtpController extends BaseController {
  constructor(
    private readonly verifyOtpValidation: Validation,
    private readonly verifyOtpUsecaseInterface: VerifyOtpUsecaseInterface,
  ) {
    super(verifyOtpValidation);
  }

  async execute(
    httpRequest: VerifyOtpController.Request,
  ): Promise<VerifyOtpController.Response> {
    const { USER_PHONE, otp } = httpRequest.body!;
    const otpVerifiedOrError = await this.verifyOtpUsecaseInterface.execute({ USER_PHONE, otp });
    if (otpVerifiedOrError instanceof VerifyingOtpError) {
      return badRequest(otpVerifiedOrError);
    }

    if (otpVerifiedOrError instanceof IncorrectOtpError) {
      return badRequest(otpVerifiedOrError);
    }
    return ok({ message: otpVerifiedOrError.message, data: otpVerifiedOrError.data });
  }
}

export namespace VerifyOtpController {
  export type Request = HttpRequest<VerifyOtpUsecaseInterface.Request>;
  export type Response = HttpResponse<VerifyOtpUsecaseInterface.Response>;
}
