import { SendOtpRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/otp/sendotp.repository';
import { SendOtpTwilioAdapterInterface } from '../../interfaces/externaladapter_interface/otp/twilio/sendotp.twilioadapter';

export class SendOtpRepository implements SendOtpRepositoryInterface {
  sendOtpTwilioAdapterInterface: SendOtpTwilioAdapterInterface;

  constructor(
    sendOtpTwilioAdapterInterface: SendOtpTwilioAdapterInterface,
  ) {
    this.sendOtpTwilioAdapterInterface = sendOtpTwilioAdapterInterface;
  }

  async sendOtp(userPhone: SendOtpRepositoryInterface.Request):
  Promise<SendOtpRepositoryInterface.Response> {
    return this.sendOtpTwilioAdapterInterface.sendOtp(userPhone);
  }
}
