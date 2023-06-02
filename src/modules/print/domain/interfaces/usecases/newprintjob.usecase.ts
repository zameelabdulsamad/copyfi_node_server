import { UseCase } from '@main/shared/interfaces/usecase/usecase';

import { PrintJobEntityInterface } from '../../entities/printjob.entity';
import { UploadingFileError } from '../../errors/uploadingfile.error';

export interface NewPrintJobUsecaseInterface extends
  UseCase<NewPrintJobUsecaseInterface.Request, NewPrintJobUsecaseInterface.Response> {
  execute(newPrintJobData: NewPrintJobUsecaseInterface.Request):
  Promise<NewPrintJobUsecaseInterface.Response>;

}

export namespace NewPrintJobUsecaseInterface {
  export type Request = Omit<PrintJobEntityInterface, 'PRINTJOB_UID' | 'PRINTJOB_TIME'>;
  export type Response = { message: string, data: any } | UploadingFileError;
}
