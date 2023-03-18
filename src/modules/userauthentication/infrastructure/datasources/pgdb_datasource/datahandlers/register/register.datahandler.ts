import { UserDataModelEntity } from '@main/db/pg/datamodelentities/user.datamodelentity';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/register_error/PhoneInUseError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/register_error/RegisterUserError';
import { RegisterUserPGDBDataHandlerInterface } from '@modules/userauthentication/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/register/register.datahandler';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Repository } from 'typeorm';

@injectable()
export class RegisterUserPGDBDataHandler implements RegisterUserPGDBDataHandlerInterface {
  userDataModelEntityRepository: Repository<UserDataModelEntity>;

  constructor(
  @inject('UserDataModelEntityRepository') userDataModelEntityRepository: Repository<UserDataModelEntity>,
  ) {
    this.userDataModelEntityRepository = userDataModelEntityRepository;
  }

  async registerUser(
    registerUserData: RegisterUserPGDBDataHandlerInterface.Request,
  ): Promise<RegisterUserPGDBDataHandlerInterface.Response> {
    try {
      const isPhoneNumberAlreadyRegistered = (await this.userDataModelEntityRepository.createQueryBuilder('USERS')
        .select('USERS.USER_UID')
        .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: registerUserData.USER_PHONE })
        .getCount()) > 0;
      if (isPhoneNumberAlreadyRegistered) {
        return new PhoneInUseError();
      }
      await this.userDataModelEntityRepository.createQueryBuilder('USERS')
        .insert().values({
          USER_EMAIL: registerUserData.USER_EMAIL,
          USER_PHONE: registerUserData.USER_PHONE,
          USER_FULLNAME: registerUserData.USER_FULLNAME,
        }).execute();
      return { message: 'User Registered' };
    } catch (error) {
      return new RegisterUserError();
    }
  }
}
