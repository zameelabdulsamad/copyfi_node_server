import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { PrintRepositoryInterface } from '@modules/print/domain/interfaces/repositories/print.repository';
import { UploadingFileError } from '@modules/print/domain/errors/uploadingfile.error';
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

    if (uploadToS3 instanceof UploadingFileError) {
      return uploadToS3;
    }
    const newPrintJobDataWithFileLocation = { ...newPrintJobData, fileLocation: uploadToS3.data };

    const printJobData = await this.printPGDBDataHandlerInterface
      .savePrintjobFiles(newPrintJobDataWithFileLocation);
    if (printJobData instanceof UploadingFileError) {
      return printJobData;
    }
    return { message: 'Upload successful', data: printJobData };
  }
}
