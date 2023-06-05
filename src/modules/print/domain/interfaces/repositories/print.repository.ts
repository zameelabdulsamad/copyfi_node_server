import { PrintJobEntityInterface } from '../../entities/printjob.entity';
import { UploadingFileError } from '../../errors/uploadingfile.error';

export interface PrintRepositoryInterface {
  newPrintJob(newPrintJobData: PrintRepositoryInterface.NewPrintJobRequest
  ): Promise<PrintRepositoryInterface.NewPrintJobResponse>;
}

export namespace PrintRepositoryInterface {
  export type NewPrintJobRequest = Omit<PrintJobEntityInterface, 'PRINTJOB_UID' | 'PRINTJOB_TIME'>;
  export type NewPrintJobResponseDataType = {
    printJobUid:string;
    printJobTime:Date;
    printJobFile:string[];
  };
  export type NewPrintJobResponse = { message: string, data: NewPrintJobResponseDataType }
  | UploadingFileError;
}
