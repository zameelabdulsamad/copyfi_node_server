import { UserDataModelEntity } from '@main/db/pg/datamodelentities/user.datamodelentity';
import { DatabaseAccessError } from '@modules/userauthentication/domain/errors/pgdatabaseaccess.error';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';
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

  async checkUserExist(checkUserExistData: UserAuthenticationPGDBDataHandlerInterface
    .CheckUserExistRequest):
    Promise<UserAuthenticationPGDBDataHandlerInterface.CheckUserExistResponse> {
    try {
      const isPhoneNumberAlreadyRegistered = (await this.userDataModelEntity.createQueryBuilder('USERS')
        .select('USERS.USER_UID')
        .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: checkUserExistData.USER_PHONE })
        .getCount()) > 0;
      if (isPhoneNumberAlreadyRegistered) {
        return { data: { userAlreadyRegistered: true } };
      }
      return { data: { userAlreadyRegistered: false } };
    } catch (error) {
      if (error instanceof Error) {
        return new DatabaseAccessError(error.message);
      }
      return new DatabaseAccessError('Unknown error occurred');
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
      return {
        data: {
          userEmail: newUser.USER_EMAIL,
          userFullname: newUser.USER_FULLNAME,
          userPhone: newUser.USER_PHONE,
          userUid: newUser.USER_UID,

        },
      };
    } catch (error) {
      if (error instanceof Error) {
        return new DatabaseAccessError(error.message);
      }
      return new DatabaseAccessError('Unknown error occurred');
    }
  }

  async getUserUID(
    loginUserData: UserAuthenticationPGDBDataHandlerInterface.GetUserUIDRequest,
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.GetUserUIDResponse> {
    try {
      const userUID = (await this.userDataModelEntity.createQueryBuilder('USERS')
        .select('USERS.USER_UID')
        .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: loginUserData.USER_PHONE })
        .getOneOrFail());
      return { data: { userUid: userUID.USER_UID } };
    } catch (error) {
      if (error instanceof Error) {
        return new DatabaseAccessError(error.message);
      }
      return new DatabaseAccessError('Unknown error occurred');
    }
  }

  async saveRefreshToken(
    saveRefreshTokenData: UserAuthenticationPGDBDataHandlerInterface.SaveRefreshTokenRequest,
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.SaveRefreshTokenResponse> {
    try {
      const userUID = saveRefreshTokenData.USER_UID;
      const refreshToken = saveRefreshTokenData.USER_REFRESHTOKEN;

      await this.userDataModelEntity.createQueryBuilder()
        .update()
        .set({ USER_REFRESHTOKEN: refreshToken })
        .where('USER_UID = :USER_UID', { USER_UID: userUID })
        .execute();
      return { success: true };
    } catch (error) {
      if (error instanceof Error) {
        return new DatabaseAccessError(error.message);
      }
      return new DatabaseAccessError('Unknown error occurred');
    }
  }

  async getRefreshToken(
    getRefreshTokenData: UserAuthenticationPGDBDataHandlerInterface.GetRefreshTokenRequest,
  ): Promise<UserAuthenticationPGDBDataHandlerInterface.GetRefreshTokenResponse> {
    try {
      const refreshToken = (await this.userDataModelEntity.createQueryBuilder('USERS')
        .select('USERS.USER_REFRESHTOKEN')
        .where('USERS.USER_UID = :USER_UID', { USER_UID: getRefreshTokenData.USER_UID })
        .getOneOrFail());
      return { data: { refreshToken: refreshToken.USER_REFRESHTOKEN } };
    } catch (error) {
      if (error instanceof Error) {
        return new DatabaseAccessError(error.message);
      }
      return new DatabaseAccessError('Unknown error occurred');
    }
  }
}
