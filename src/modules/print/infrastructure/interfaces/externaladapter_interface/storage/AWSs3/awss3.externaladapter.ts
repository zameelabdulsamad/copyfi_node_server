import { PrintJobEntityInterface } from '@modules/print/domain/entities/printjob.entity';
import { UploadingFileError } from '@modules/print/domain/errors/uploadingfile.error';

export interface AWSS3ExternalAdapterInterface {
  savePrintjobFiles(
    savePrintjobFilesData: AWSS3ExternalAdapterInterface.SavePrintJobRequest
  ): Promise<AWSS3ExternalAdapterInterface.SavePrintJobResponse>;
}

export namespace AWSS3ExternalAdapterInterface {
  export type SavePrintJobRequest = Omit<PrintJobEntityInterface, 'PRINTJOB_UID' | 'PRINTJOB_TIME' | 'PRINTJOB_USER'>;
  export type SavePrintJobResponse = { data: string[] } | UploadingFileError;
}
