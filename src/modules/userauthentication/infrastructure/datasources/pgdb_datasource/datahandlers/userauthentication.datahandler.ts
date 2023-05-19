import { UserDataModelEntity } from '@main/db/pg/datamodelentities/user.datamodelentity';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/RegisterUserError';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/UnauthorizedError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/VerifyingOtpError';
import { UserAuthenticationPGDBDataHandlerInterface } from '@modules/userauthentication/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/userauthentication.datahandler';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Repository } from 'typeorm';

@injectable()
export class UserAuthenticationPGDBDataHandler implements
UserAuthenticationPGDBDataHandlerInterface {
  userDataModelEntity: Repository<UserDataModelEntity>;

  constructor(
  @inject('UserDataModelEntityRepository') userDataModelEntity: Repository<UserDataModelEntity>,
  ) {
    this.userDataModelEntity = userDataModelEntity;
  }

  async checkUserExist(verifyOtpData: UserAuthenticationPGDBDataHandlerInterface.VerifyOtpRequest):
  Promise<UserAuthenticationPGDBDataHandlerInterface.VerifyOtpResponse> {
    try {
      const isPhoneNumberAlreadyRegistered = (await this.userDataModelEntity.createQueryBuilder('USERS')
        .select('USERS.USER_UID')
        .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: verifyOtpData.USER_PHONE })
        .getCount()) > 0;
      if (isPhoneNumberAlreadyRegistered) {
        return { data: { userAlreadyRegisted: true } };
      }
      return { data: { userAlreadyRegisted: false } };
    } catch (error) {
      return new VerifyingOtpError();
    }
  }

  async registerUser(registerUserData:
  UserAuthenticationPGDBDataHandlerInterface.RegisterUserRequest):
    Promise<UserAuthenticationPGDBDataHandlerInterface.RegisterUserResponse> {
    try {
      const isPhoneNumberAlreadyRegistered = (await this.userDataModelEntity.createQueryBuilder('USERS')
        .select('USERS.USER_UID')
        .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: registerUserData.USER_PHONE })
        .getCount()) > 0;
      if (isPhoneNumberAlreadyRegistered) {
        return new PhoneInUseError();
      }
      const newUser = await this.userDataModelEntity.save({
        USER_EMAIL: registerUserData.USER_EMAIL,
        USER_PHONE: registerUserData.USER_PHONE,
        USER_FULLNAME: registerUserData.USER_FULLNAME,
      });
      return { data: newUser };
    } catch (error) {
      return new RegisterUserError();
    }
  }

  async getUserUID(
    loginUserData: UserAuthenticationPGDBDataHandlerInterface.LoginUserRequest,
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.LoginUserResponse> {
    try {
      const userUID = (await this.userDataModelEntity.createQueryBuilder('USERS')
        .select('USERS.USER_UID')
        .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: loginUserData.USER_PHONE })
        .getOneOrFail());
      return userUID;
    } catch (error) {
      return new UnauthorizedError();
    }
  }
}
