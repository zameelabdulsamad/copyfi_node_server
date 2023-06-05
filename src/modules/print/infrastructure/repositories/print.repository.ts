import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { PrintRepositoryInterface } from '@modules/print/domain/interfaces/repositories/print.repository';
import { UploadingFileError } from '@modules/print/domain/errors/uploadingfile.error';
import { DatabaseAccessError } from '@modules/userauthentication/domain/errors/pgdatabaseaccess.error';
import { AWSS3UploadError } from '@modules/print/domain/errors/awss3upload.error';
import { PrintPGDBDataHandlerInterface } from '../interfaces/datasource_interface/pgdb/datahandlers/print.datahandler';
import { AWSS3ExternalAdapterInterface } from '../interfaces/externaladapter_interface/storage/AWSs3/awss3.externaladapter';

@injectable()
export class PrintRepository implements PrintRepositoryInterface {
  printPGDBDataHandlerInterface: PrintPGDBDataHandlerInterface;

  awsS3ExternalAdapterInterface:AWSS3ExternalAdapterInterface;

  constructor(
  @inject('PrintPGDBDataHandlerInterface') printPGDBDataHandlerInterface: PrintPGDBDataHandlerInterface,
    @inject('AWSS3ExternalAdapterInterface') awsS3ExternalAdapterInterface: AWSS3ExternalAdapterInterface,

  ) {
    this.printPGDBDataHandlerInterface = printPGDBDataHandlerInterface;
    this.awsS3ExternalAdapterInterface = awsS3ExternalAdapterInterface;
  }

  async newPrintJob(newPrintJobData: PrintRepositoryInterface.NewPrintJobRequest):
  Promise<PrintRepositoryInterface.NewPrintJobResponse> {
    const uploadToS3 = await this.awsS3ExternalAdapterInterface.savePrintjobFiles(newPrintJobData);

    if (uploadToS3 instanceof AWSS3UploadError) {
      return new UploadingFileError();
    }
    const printJobData = await this.printPGDBDataHandlerInterface
      .savePrintjobFiles({
        fileLocation: uploadToS3.data.fileLocationS3,
        PRINTJOB_USER: newPrintJobData.PRINTJOB_USER,
      });
    if (printJobData instanceof DatabaseAccessError) {
      return new UploadingFileError();
    }
    return {
      message: 'Upload successful',
      data:
      {
        printJobFile: uploadToS3.data.fileLocationS3,
        printJobTime: printJobData.data.printJobTime,
        printJobUid: printJobData.data.printJobUid,
      },
    };
  }
}
