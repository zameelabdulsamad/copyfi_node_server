import env from '@main/config/env';
import { SendOtpTwilioAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/otp/twilio/sendotp.twilioadapter';
import { Twilio } from 'twilio';

export class SendOtpTwilioAdapter implements SendOtpTwilioAdapterInterface {
  private credentials: any = {
    accountSid: env.twilioConfig.twilioAccountSid,
    authToken: env.twilioConfig.twilioAuthToken,
    serviceSid: env.twilioConfig.twilioServiceSid,
  };

  async sendOtp(
    userPhone: SendOtpTwilioAdapterInterface.Request,
  ): Promise<SendOtpTwilioAdapterInterface.Response> {
    const client = new Twilio(this.credentials.accountSid, this.credentials.authToken);
    client.verify.v2.services(this.credentials.serviceSid).verifications.create({
      to: `${userPhone.USER_PHONE}`,
      channel: 'sms',
    });
    return 'OTP SENT';
  }
}
