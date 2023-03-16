import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { VerifyOtpRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/otp/verifyotp.repository';
import { VerifyOtpTwilioAdapterInterface } from '../../interfaces/externaladapter_interface/otp/twilio/verifyotp.twilioadapter';

@injectable()
export class VerifyOtpRepository implements VerifyOtpRepositoryInterface {
  verifyOtpTwilioAdapterInterface: VerifyOtpTwilioAdapterInterface;

  constructor(
  @inject('VerifyOtpTwilioAdapterInterface') verifyOtpTwilioAdapterInterface: VerifyOtpTwilioAdapterInterface,
  ) {
    this.verifyOtpTwilioAdapterInterface = verifyOtpTwilioAdapterInterface;
  }

  async verifyOtp(verifyOtpData: VerifyOtpRepositoryInterface.Request):
  Promise<VerifyOtpRepositoryInterface.Response> {
    return this.verifyOtpTwilioAdapterInterface.verifyOtp(verifyOtpData);
  }
}
