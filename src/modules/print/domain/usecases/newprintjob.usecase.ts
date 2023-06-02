import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { NewPrintJobUsecaseInterface } from '../interfaces/usecases/newprintjob.usecase';
import { PrintRepositoryInterface } from '../interfaces/repositories/print.repository';

@injectable()
export class NewPrintJobUsecase implements NewPrintJobUsecaseInterface {
  printRepositoryInterface: PrintRepositoryInterface;

  constructor(
  @inject('PrintRepositoryInterface') printRepositoryInterface: PrintRepositoryInterface,
  ) {
    this.printRepositoryInterface = printRepositoryInterface;
  }

  async execute(newPrintJobData: NewPrintJobUsecaseInterface.Request):
  Promise<NewPrintJobUsecaseInterface.Response> {
    return this.printRepositoryInterface.newPrintJob({
      ...newPrintJobData,
    });
  }
}
