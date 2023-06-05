import { PrintJobEntityInterface } from '@modules/print/domain/entities/printjob.entity';
import { AWSS3UploadError } from '@modules/print/domain/errors/awss3upload.error';

export interface AWSS3ExternalAdapterInterface {
  savePrintjobFiles(
    savePrintjobFilesData: AWSS3ExternalAdapterInterface.SavePrintJobRequest
  ): Promise<AWSS3ExternalAdapterInterface.SavePrintJobResponse>;
}

export namespace AWSS3ExternalAdapterInterface {
  export type SavePrintJobRequest = Omit<PrintJobEntityInterface, 'PRINTJOB_UID' | 'PRINTJOB_TIME' | 'PRINTJOB_USER'>;
  export type SavePrintJobResponseDataType = {
    fileLocationS3:string[];
  };
  export type SavePrintJobResponse = { data: SavePrintJobResponseDataType } | AWSS3UploadError;
}
