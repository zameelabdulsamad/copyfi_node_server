import { UserAuthenticationRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/userauthentication.repository';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/VerifyingOtpError';
import { IncorrectOtpError } from '@modules/userauthentication/domain/errors/IncorrectOtpError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/RegisterUserError';
import { UnauthorizedError } from '@modules/userauthentication/domain/errors/UnauthorizedError';
import { UserAuthenticationPGDBDataHandlerInterface } from '../interfaces/datasource_interface/pgdb/datahandlers/userauthentication.datahandler';
import { JwtExternalAdapterInterface } from '../interfaces/externaladapter_interface/token/jwt/jwt.externaladapter';
import { TwilioExternalAdapterInterface } from '../interfaces/externaladapter_interface/otp/twilio/twilio.externaladapter';

@injectable()
export class UserAuthenticationRepository implements UserAuthenticationRepositoryInterface {
  twilioExternalAdapterInterface: TwilioExternalAdapterInterface;

  jwtExternalAdapterInterface: JwtExternalAdapterInterface;

  userAuthenticationPGDBDataHandlerInterface: UserAuthenticationPGDBDataHandlerInterface;

  constructor(
  @inject('TwilioExternalAdapterInterface') twilioExternalAdapterInterface: TwilioExternalAdapterInterface,
    @inject('JwtExternalAdapterInterface') jwtExternalAdapterInterface: JwtExternalAdapterInterface,
    @inject('UserAuthenticationPGDBDataHandlerInterface') userAuthenticationPGDBDataHandlerInterface: UserAuthenticationPGDBDataHandlerInterface,
  ) {
    this.twilioExternalAdapterInterface = twilioExternalAdapterInterface;
    this.jwtExternalAdapterInterface = jwtExternalAdapterInterface;
    this.userAuthenticationPGDBDataHandlerInterface = userAuthenticationPGDBDataHandlerInterface;
  }

  async sendOtp(sendOtpData: UserAuthenticationRepositoryInterface.SendOtpRequest):
  Promise<UserAuthenticationRepositoryInterface.SendOtpResponse> {
    return this.twilioExternalAdapterInterface.sendOtp(sendOtpData);
  }

  async verifyOtp(verifyOtpData: UserAuthenticationRepositoryInterface.VerifyOtpRequest):
  Promise<UserAuthenticationRepositoryInterface.VerifyOtpResponse> {
    const verifyOtpResult = await this.twilioExternalAdapterInterface.verifyOtp(verifyOtpData);

    if (verifyOtpResult instanceof IncorrectOtpError) {
      return verifyOtpResult;
    }

    if (verifyOtpResult instanceof VerifyingOtpError) {
      return verifyOtpResult;
    }

    const checkUserExistResult = await this.userAuthenticationPGDBDataHandlerInterface
      .checkUserExist(verifyOtpData);

    if (checkUserExistResult instanceof VerifyingOtpError) {
      return checkUserExistResult;
    }

    if (checkUserExistResult.data.userAlreadyRegistered === true) {
      const getUserUIDResult = await this.userAuthenticationPGDBDataHandlerInterface
        .getUserUID(verifyOtpData);

      if (getUserUIDResult instanceof UnauthorizedError) {
        return getUserUIDResult;
      }
      const generateTokenResult = await this.jwtExternalAdapterInterface.generateToken(
        getUserUIDResult,
      );

      if (generateTokenResult instanceof UnauthorizedError) {
        return generateTokenResult;
      }

      const newcheckUserExistResult = { ...checkUserExistResult.data, TOKEN: generateTokenResult };

      return {
        message: verifyOtpResult.message,
        data: newcheckUserExistResult,
      };
    }

    return {
      message: verifyOtpResult.message,
      data: checkUserExistResult.data,
    };
  }

  async registerUser(registerUserData: UserAuthenticationRepositoryInterface.RegisterUserRequest):
  Promise<UserAuthenticationRepositoryInterface.RegisterUserResponse> {
    const newUserData = await this.userAuthenticationPGDBDataHandlerInterface
      .registerUser(registerUserData);

    if (newUserData instanceof PhoneInUseError || newUserData instanceof RegisterUserError) {
      return newUserData;
    }

    const generateTokenResult = await this.jwtExternalAdapterInterface.generateToken(
      newUserData.data,
    );

    if (generateTokenResult instanceof UnauthorizedError) {
      return generateTokenResult;
    }

    const newUserDataWithToken = { ...newUserData.data, TOKEN: generateTokenResult };

    return { message: 'User registration successful', data: newUserDataWithToken };
  }

  async authenticateUser(authenticateUserData: string):
  Promise<UserAuthenticationRepositoryInterface.AuthenticateUserResponse> {
    return this.jwtExternalAdapterInterface.verifyToken(authenticateUserData);
  }
}
