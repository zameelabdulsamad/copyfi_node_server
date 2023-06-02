import { BaseController } from '@main/shared/controllers/basecontroller';
import { badRequest, ok } from '@main/shared/helpers/http_helper/http.helper';
import { HttpRequest } from '@main/shared/interfaces/http/httprequest';
import { HttpResponse } from '@main/shared/interfaces/http/httpresponse';
import { Validation } from '@main/shared/interfaces/validation/validation';
import { UploadingFileError } from '@modules/print/domain/errors/uploadingfile.error';
import { NewPrintJobUsecaseInterface } from '@modules/print/domain/interfaces/usecases/newprintjob.usecase';

export class NewPrintJobController extends BaseController {
  constructor(
    private readonly newPrintJobValidation: Validation,
    private readonly newPrintJobUsecaseInterface: NewPrintJobUsecaseInterface,
  ) {
    super(newPrintJobValidation);
  }

  async execute(
    httpRequest: NewPrintJobController.Request,
  ): Promise<NewPrintJobController.Response> {
    const PRINTJOB_FILE = httpRequest.files!;
    const PRINTJOB_USER = httpRequest.userUid!;

    const fileUploadedOrError = await this.newPrintJobUsecaseInterface
      .execute({ PRINTJOB_FILE, PRINTJOB_USER });
    if (fileUploadedOrError instanceof UploadingFileError) {
      return badRequest(fileUploadedOrError);
    }
    return ok(fileUploadedOrError.message);
  }
}

export namespace NewPrintJobController {
  export type Request = HttpRequest<NewPrintJobUsecaseInterface.Request>;
  export type Response = HttpResponse<NewPrintJobUsecaseInterface.Response>;
}
