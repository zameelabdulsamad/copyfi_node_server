// import { ok } from '@main/shared/helpers/http_helper/http.helper';
// import { HttpRequest } from '@main/shared/interfaces/http/httprequest';
// import { HttpResponse } from '@main/shared/interfaces/http/httpresponse';
// import { Validation } from '@main/shared/interfaces/validation/validation';

// export class SendOtpController implements SendOtpControllerInterface {
//   sendOtpUsecaseInterface: SendOtpUsecaseInterface;

//   constructor(
//     sendOtpUsecaseInterface: SendOtpUsecaseInterface,
//   ) {
//     this.sendOtpUsecaseInterface = sendOtpUsecaseInterface;
//   }

//   validation?: Validation | undefined;

//   handle(httpRequest: HttpRequest<any, any, any>): Promise<HttpResponse<any>> {
//     throw new Error('Method not implemented.');
//   }

//   async execute(
//     httpRequest: SendOtpControllerInterface.Request,
//   ): Promise<SendOtpControllerInterface.Response> {
//     const { USER_PHONE } = httpRequest.body!;
//     await this.sendOtpUsecaseInterface.execute({ USER_PHONE });
//     return ok({
//       authenticationToken: 'dd',
//     });
//   }
// }
