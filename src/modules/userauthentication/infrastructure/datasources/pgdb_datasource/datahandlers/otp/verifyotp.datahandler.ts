import { UserDataModelEntity } from '@main/db/pg/datamodelentities/user.datamodelentity';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';
import { VerifyOtpPGDBDataHandlerInterface } from '@modules/userauthentication/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/otp/verifyotp.datahandler';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Repository } from 'typeorm';

@injectable()
export class VerifyOtpPGDBDataHandler implements VerifyOtpPGDBDataHandlerInterface {
  userDataModelEntity: Repository<UserDataModelEntity>;

  constructor(
  @inject('UserDataModelEntityRepository') userDataModelEntity: Repository<UserDataModelEntity>,
  ) {
    this.userDataModelEntity = userDataModelEntity;
  }

  async checkUserExist(
    verifyOtpData: VerifyOtpPGDBDataHandlerInterface.Request,
  ): Promise<VerifyOtpPGDBDataHandlerInterface.Response> {
    try {
      const isPhoneNumberAlreadyRegistered = (await this.userDataModelEntity.createQueryBuilder('USERS')
        .select('USERS.USER_UID')
        .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: verifyOtpData.USER_PHONE })
        .getCount()) > 0;
      if (isPhoneNumberAlreadyRegistered) {
        return { userAlreadyRegisted: true };
      }
      return { userAlreadyRegisted: false };
    } catch (error) {
      return new VerifyingOtpError();
    }
  }
}
