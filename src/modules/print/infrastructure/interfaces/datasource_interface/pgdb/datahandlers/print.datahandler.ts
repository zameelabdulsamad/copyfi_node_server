import { PrintJobEntityInterface } from '@modules/print/domain/entities/printjob.entity';
import { UploadingFileError } from '@modules/print/domain/errors/uploadingfile.error';

export interface PrintPGDBDataHandlerInterface {
  savePrintjobFiles(
    printJobFilesData: PrintPGDBDataHandlerInterface.SavePrintJobRequest
  ): Promise<PrintPGDBDataHandlerInterface.SavePrintJobResponse>;
}

export namespace PrintPGDBDataHandlerInterface {
  export type SavePrintJobRequest = Omit<PrintJobEntityInterface, 'PRINTJOB_UID' | 'PRINTJOB_TIME'> & { fileLocation: string[] };
  export type SavePrintJobResponse = { data: any } | UploadingFileError;
}
