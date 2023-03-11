import { SendOtpRepositoryInterface } from '@modules/userauthentication/domain/repositories/otp_repository/sendotp.repository';
import SendOtpTwilioAdapter from '@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter';

export class SendOtpRepository implements SendOtpRepositoryInterface {
  async sendOtp(userPhone: SendOtpRepositoryInterface.Request):
  Promise<SendOtpRepositoryInterface.Response> {
    return SendOtpTwilioAdapter.sendOtp(userPhone.user_phone);
  }
}
