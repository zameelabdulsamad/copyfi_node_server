import { UserDataModelEntity } from '@main/db/pg/datamodelentities/user.datamodelentity';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/login_error/UnauthorizedError';
import { LoginUserPGDBDataHandlerInterface } from '@modules/userauthentication/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/login/loginuser.datahandler';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { Repository } from 'typeorm';

@injectable()
export class LoginUserPGDBDataHandler implements LoginUserPGDBDataHandlerInterface {
  userDataModelEntity: Repository<UserDataModelEntity>;

  constructor(
  @inject('UserDataModelEntityRepository') userDataModelEntity: Repository<UserDataModelEntity>,
  ) {
    this.userDataModelEntity = userDataModelEntity;
  }

  async getUserUID(
    loginUserData: LoginUserPGDBDataHandlerInterface.Request,
  ): Promise<LoginUserPGDBDataHandlerInterface.Response> {
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
