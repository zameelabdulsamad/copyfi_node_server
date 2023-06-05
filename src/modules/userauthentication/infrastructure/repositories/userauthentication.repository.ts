import { UserAuthenticationRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/userauthentication.repository';
import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { PhoneInUseError } from '@modules/userauthentication/domain/errors/PhoneInUseError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/VerifyingOtpError';
import { IncorrectOtpError } from '@modules/userauthentication/domain/errors/IncorrectOtpError';
import { RegisterUserError } from '@modules/userauthentication/domain/errors/RegisterUserError';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/SendingOtpError';
import { DatabaseAccessError } from '@modules/userauthentication/domain/errors/pgdatabaseaccess.error';
import { TwilioAPIError } from '@modules/userauthentication/domain/errors/twilioapi.error';
import { TokenGenerationError } from '@modules/userauthentication/domain/errors/tokengeneration.error';
import { InvalidTokenError } from '@modules/userauthentication/domain/errors/tokeninvalid.error';
import { InvalidRefreshTokenError } from '@modules/userauthentication/domain/errors/refreshtokeninvalid.error';
import { RefreshTokenGenerationError } from '@modules/userauthentication/domain/errors/refreshtokengeneration.error';
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
    const twilioExternalAdapterData = await this.twilioExternalAdapterInterface
      .sendOtp(sendOtpData);

    if (twilioExternalAdapterData instanceof SendingOtpError) {
      return twilioExternalAdapterData;
    }
    if (twilioExternalAdapterData instanceof TwilioAPIError) {
      return new SendingOtpError();
    }

    if (twilioExternalAdapterData.success === true) {
      return { message: 'OTP has been sent successfully' };
    }
    return new SendingOtpError();
  }

  async verifyOtp(verifyOtpData: UserAuthenticationRepositoryInterface.VerifyOtpRequest):
  Promise<UserAuthenticationRepositoryInterface.VerifyOtpResponse> {
    const verifyOtpResult = await this.twilioExternalAdapterInterface.verifyOtp(verifyOtpData);

    if (verifyOtpResult instanceof IncorrectOtpError) {
      return verifyOtpResult;
    }

    if (verifyOtpResult instanceof TwilioAPIError) {
      return new VerifyingOtpError();
    }

    if (verifyOtpResult.success === true) {
      const checkUserExistResult = await this.userAuthenticationPGDBDataHandlerInterface
        .checkUserExist(verifyOtpData);

      if (checkUserExistResult instanceof DatabaseAccessError) {
        return new VerifyingOtpError();
      }

      if (checkUserExistResult.data.userAlreadyRegistered === true) {
        const getUserUIDResult = await this.userAuthenticationPGDBDataHandlerInterface
          .getUserUID(verifyOtpData);

        if (getUserUIDResult instanceof DatabaseAccessError) {
          return new VerifyingOtpError();
        }

        const generateTokenResult = await this.jwtExternalAdapterInterface.generateToken(
          {
            USER_UID: getUserUIDResult.data.userUid,
          },
        );

        if (generateTokenResult instanceof TokenGenerationError) {
          return new VerifyingOtpError();
        }

        const saveRefreshToken = await this.userAuthenticationPGDBDataHandlerInterface
          .saveRefreshToken({
            USER_UID: getUserUIDResult.data.userUid,
            USER_REFRESHTOKEN: generateTokenResult.data.refreshToken,
          });

        if (saveRefreshToken instanceof DatabaseAccessError) {
          return new VerifyingOtpError();
        }

        return {
          message: 'OTP successfully verified',
          data: {
            userAlreadyRegistered: checkUserExistResult.data.userAlreadyRegistered,
            token: generateTokenResult.data.token,
            refreshToken: generateTokenResult.data.refreshToken,
          },
        };
      }

      return {
        message: 'OTP successfully verified',
        data: { userAlreadyRegistered: checkUserExistResult.data.userAlreadyRegistered },
      };
    }

    return new VerifyingOtpError();
  }

  async registerUser(registerUserData: UserAuthenticationRepositoryInterface.RegisterUserRequest):
  Promise<UserAuthenticationRepositoryInterface.RegisterUserResponse> {
    const newUserData = await this.userAuthenticationPGDBDataHandlerInterface
      .registerUser(registerUserData);

    if (newUserData instanceof PhoneInUseError) {
      return newUserData;
    }

    if (newUserData instanceof DatabaseAccessError) {
      return new RegisterUserError();
    }

    const generateTokenResult = await this.jwtExternalAdapterInterface.generateToken({
      USER_UID: newUserData.data.userUid,
    });

    if (generateTokenResult instanceof TokenGenerationError) {
      return new RegisterUserError();
    }

    const saveRefreshToken = await this.userAuthenticationPGDBDataHandlerInterface
      .saveRefreshToken({
        USER_UID: newUserData.data.userUid,
        USER_REFRESHTOKEN: generateTokenResult.data.refreshToken,
      });

    if (saveRefreshToken instanceof DatabaseAccessError) {
      return new RegisterUserError();
    }

    return {
      message: 'User registration successful',
      data: {
        userFullname: newUserData.data.userFullname,
        userEmail: newUserData.data.userEmail,
        userPhone: newUserData.data.userPhone,
        token: generateTokenResult.data.token,
        refreshToken: generateTokenResult.data.refreshToken,
      },
    };
  }

  async authenticateUser(authenticateUserData:
  UserAuthenticationRepositoryInterface.AuthenticateUserRequest):
    Promise<UserAuthenticationRepositoryInterface.AuthenticateUserResponse> {
    const jwtExternalAdapterData = await this.jwtExternalAdapterInterface
      .verifyToken({ token: authenticateUserData.token });

    if (jwtExternalAdapterData instanceof InvalidTokenError) {
      return new InvalidTokenError();
    }
    return { message: 'Access token verified and is valid', data: { uid: jwtExternalAdapterData.data.userUid } };
  }

  async refreshToken(refreshTokenData: UserAuthenticationRepositoryInterface.RefreshTokenRequest):
  Promise<UserAuthenticationRepositoryInterface.RefreshTokenResponse> {
    const payload = await this.jwtExternalAdapterInterface
      .verifyToken({ token: refreshTokenData.USER_REFRESHTOKEN });

    if (payload instanceof InvalidTokenError) {
      return new InvalidRefreshTokenError();
    }

    const refreshTokenFromDB = await this.userAuthenticationPGDBDataHandlerInterface
      .getRefreshToken({ USER_UID: payload.data.userUid });

    if (refreshTokenFromDB instanceof DatabaseAccessError) {
      return new RefreshTokenGenerationError();
    }

    if (refreshTokenData.USER_REFRESHTOKEN !== refreshTokenFromDB.data.refreshToken) {
      return new InvalidRefreshTokenError();
    }

    const generateNewTokenResult = await this.jwtExternalAdapterInterface.generateToken({
      USER_UID: payload.data.userUid,
    });

    if (generateNewTokenResult instanceof TokenGenerationError) {
      return new RefreshTokenGenerationError();
    }

    const saveRefreshToken = await this.userAuthenticationPGDBDataHandlerInterface
      .saveRefreshToken({
        USER_UID: payload.data.userUid,
        USER_REFRESHTOKEN: generateNewTokenResult.data.refreshToken,
      });

    if (saveRefreshToken instanceof DatabaseAccessError) {
      return new RefreshTokenGenerationError();
    }

    return {
      message: 'Refresh Token updation successful',
      data: {
        token: generateNewTokenResult.data.token,
        refreshToken: generateNewTokenResult.data.refreshToken,
      },
    };
  }
}
