import { BaseController } from '@main/shared/controllers/basecontroller';
import { ok } from '@main/shared/helpers/http_helper/http.helper';
import { HttpRequest } from '@main/shared/interfaces/http/httprequest';
import { HttpResponse } from '@main/shared/interfaces/http/httpresponse';
import { Validation } from '@main/shared/interfaces/validation/validation';
import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/sendotp.usecase';

export class SendOtpController extends BaseController {
  constructor(
    private readonly sendOtpValidation: Validation,
    private readonly sendOtpUsecaseInterface: SendOtpUsecaseInterface,
  ) {
    super(sendOtpValidation);
  }

  async execute(
    httpRequest: SendOtpController.Request,
  ): Promise<SendOtpController.Response> {
    const { USER_PHONE } = httpRequest.body!;
    await this.sendOtpUsecaseInterface.execute({ USER_PHONE });
    return ok({
      authenticationToken: 'otpSent',
    });
  }
}

export namespace SendOtpController {
  export type Request = HttpRequest<SendOtpUsecaseInterface.Request>;
  export type Response = HttpResponse<{ authenticationToken: string } >;
}
