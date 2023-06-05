import { PrintJobEntityInterface } from '@modules/print/domain/entities/printjob.entity';
import { DatabaseAccessError } from '@modules/userauthentication/domain/errors/pgdatabaseaccess.error';

export interface PrintPGDBDataHandlerInterface {
  savePrintjobFiles(
    printJobFilesData: PrintPGDBDataHandlerInterface.SavePrintJobRequest
  ): Promise<PrintPGDBDataHandlerInterface.SavePrintJobResponse>;
}

export namespace PrintPGDBDataHandlerInterface {
  export type SavePrintJobRequest = Omit<PrintJobEntityInterface, 'PRINTJOB_UID' | 'PRINTJOB_TIME' | 'PRINTJOB_FILE'> & { fileLocation: string[] };
  export type SavePrintJobResponseDataType = {
    printJobTime: Date;
    printJobUid: string;
  };
  export type SavePrintJobResponse = { data: SavePrintJobResponseDataType } | DatabaseAccessError;
}
