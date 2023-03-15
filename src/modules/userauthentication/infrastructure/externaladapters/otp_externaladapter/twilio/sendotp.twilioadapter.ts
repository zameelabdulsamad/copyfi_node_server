import env from '@main/config/env';
import { SendOtpTwilioAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/otp/twilio/sendotp.twilioadapter';
import { injectable } from 'inversify';
import { Twilio } from 'twilio';
import 'reflect-metadata';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/SendingOtpError';

@injectable()
export class SendOtpTwilioAdapter implements SendOtpTwilioAdapterInterface {
  private credentials: any = {
    accountSid: env.twilioConfig.twilioAccountSid,
    authToken: env.twilioConfig.twilioAuthToken,
    serviceSid: env.twilioConfig.twilioServiceSid,
  };

  async sendOtp(
    sendOtpData: SendOtpTwilioAdapterInterface.Request,
  ): Promise<SendOtpTwilioAdapterInterface.Response> {
    try {
      const client = new Twilio(this.credentials.accountSid, this.credentials.authToken);
      const verification = await client.verify.v2.services(
        this.credentials.serviceSid,
      ).verifications.create({
        to: `${sendOtpData.USER_PHONE}`,
        channel: 'sms',
      });
      if (verification.status === 'pending') {
        return 'OTP SENT';
      }
      return new SendingOtpError();
    } catch (error) {
      return new SendingOtpError();
    }
  }
}
