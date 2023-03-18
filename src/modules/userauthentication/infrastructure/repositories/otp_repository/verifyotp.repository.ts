import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';
import { VerifyOtpRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/otp/verifyotp.repository';
import { VerifyOtpTwilioAdapterInterface } from '../../interfaces/externaladapter_interface/twilio/verifyotp.twilioadapter';
import { VerifyOtpPGDBDataHandlerInterface } from '../../interfaces/datasource_interface/pgdb/datahandlers/otp/verifyotp.datahandler';

@injectable()
export class VerifyOtpRepository implements VerifyOtpRepositoryInterface {
  verifyOtpTwilioAdapterInterface: VerifyOtpTwilioAdapterInterface;

  verifyOtpPGDBDataHandlerInterface: VerifyOtpPGDBDataHandlerInterface;

  constructor(
  @inject('VerifyOtpTwilioAdapterInterface') verifyOtpTwilioAdapterInterface: VerifyOtpTwilioAdapterInterface,

    @inject('VerifyOtpPGDBDataHandlerInterface') verifyOtpPGDBDataHandlerInterface: VerifyOtpPGDBDataHandlerInterface,

  ) {
    this.verifyOtpTwilioAdapterInterface = verifyOtpTwilioAdapterInterface;

    this.verifyOtpPGDBDataHandlerInterface = verifyOtpPGDBDataHandlerInterface;
  }

  async verifyOtp(verifyOtpData: VerifyOtpRepositoryInterface.Request):
  Promise<VerifyOtpRepositoryInterface.Response> {
    const [verifyOtpResult, checkUserExistResult] = await Promise.all([
      this.verifyOtpTwilioAdapterInterface.verifyOtp(verifyOtpData),
      this.verifyOtpPGDBDataHandlerInterface.checkUserExist(verifyOtpData),
    ]);

    if (verifyOtpResult instanceof VerifyingOtpError) {
      return verifyOtpResult;
    }

    if (checkUserExistResult instanceof VerifyingOtpError) {
      return checkUserExistResult;
    }

    return {
      message: verifyOtpResult.message,
      userAlreadyRegisted: checkUserExistResult.userAlreadyRegisted,
    };
  }
}
