import { PrintJobDataModelEntity } from '@main/db/pg/datamodelentities/printjob.datamodelentity';
import { UserDataModelEntity } from '@main/db/pg/datamodelentities/user.datamodelentity';
import { PrintPGDBDataHandlerInterface } from '@modules/print/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/print.datahandler';
import { DatabaseAccessError } from '@modules/userauthentication/domain/errors/pgdatabaseaccess.error';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Repository } from 'typeorm';

@injectable()
export class PrintPGDBDataHandler implements
PrintPGDBDataHandlerInterface {
  printJobDataModelEntity: Repository<PrintJobDataModelEntity>;

  userDataModelEntity: Repository<UserDataModelEntity>;

  constructor(
  @inject('PrintJobDataModelEntityRepository') printJobDataModelEntity: Repository<PrintJobDataModelEntity>,
    @inject('UserDataModelEntityRepository') userDataModelEntity: Repository<UserDataModelEntity>,

  ) {
    this.printJobDataModelEntity = printJobDataModelEntity;
    this.userDataModelEntity = userDataModelEntity;
  }

  async savePrintjobFiles(
    printJobFilesData: PrintPGDBDataHandlerInterface.SavePrintJobRequest,
  ): Promise<PrintPGDBDataHandlerInterface.SavePrintJobResponse> {
    const user = await this.userDataModelEntity.createQueryBuilder('USERS')
      .select()
      .where('USERS.USER_UID = :USER_UID', { USER_UID: printJobFilesData.PRINTJOB_USER })
      .getOne();

    try {
      const newPrintJob = await this.printJobDataModelEntity.save({
        PRINTJOB_USER: user!,
        PRINTJOB_FILE: printJobFilesData.fileLocation,
      });
      return {
        data: {
          printJobTime: newPrintJob.PRINTJOB_TIME,
          printJobUid: newPrintJob.PRINTJOB_UID,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        return new DatabaseAccessError(error.message);
      }
      return new DatabaseAccessError('Unknown error occurred');
    }
  }
}
