import { sl } from '@main/di/inversify.config';
import { BaseController } from '@main/shared/controllers/basecontroller';
import { RequiredFieldValidation } from '@main/shared/validations/RequiredFieldValidation';
import { ValidationComposite } from '@main/shared/validations/ValidationComposite';
import { NewPrintJobUsecaseInterface } from '@modules/print/domain/interfaces/usecases/newprintjob.usecase';
import { NewPrintJobController } from '../controllers/newprintjob.controller';

export const newPrintJobFactory = (): BaseController => {
  const validation = new ValidationComposite(
    [
      new RequiredFieldValidation('PRINTJOB_FILE'),
    ],
    'files',
  );
  const useCase = sl.get<NewPrintJobUsecaseInterface>('NewPrintJobUsecaseInterface');
  return new NewPrintJobController(validation, useCase);
};
