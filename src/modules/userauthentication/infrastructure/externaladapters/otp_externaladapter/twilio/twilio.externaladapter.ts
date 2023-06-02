import env from '@main/config/env';
import { injectable } from 'inversify';
import { Twilio } from 'twilio';
import 'reflect-metadata';
import { TwilioExternalAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/otp/twilio/twilio.externaladapter';
import { IncorrectOtpError } from '@modules/userauthentication/domain/errors/IncorrectOtpError';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/SendingOtpError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/VerifyingOtpError';

@injectable()
export class TwilioExternalAdapter implements TwilioExternalAdapterInterface {
  private credentials: any = {
    accountSid: env.twilioConfig.twilioAccountSid,
    authToken: env.twilioConfig.twilioAuthToken,
    serviceSid: env.twilioConfig.twilioServiceSid,
  };

  async sendOtp(
    sendOtpData: TwilioExternalAdapterInterface.SendOtpRequest,
  ): Promise<TwilioExternalAdapterInterface.SendOtpResponse> {
    try {
      const client = new Twilio(this.credentials.accountSid, this.credentials.authToken);
      const verification = await client.verify.v2.services(
        this.credentials.serviceSid,
      ).verifications.create({
        to: `${sendOtpData.USER_PHONE}`,
        channel: 'sms',
      });
      if (verification.status === 'pending') {
        return { message: 'OTP has been sent successfully' };
      }
      return new SendingOtpError();
    } catch (error) {
      return new SendingOtpError();
    }
  }

  async verifyOtp(
    verifyOtpData: TwilioExternalAdapterInterface.VerifyOtpRequest,
  ): Promise<TwilioExternalAdapterInterface.VerifyOtpResponse> {
    try {
      const client = new Twilio(this.credentials.accountSid, this.credentials.authToken);
      const verifiedResponse = await client.verify.v2.services(
        this.credentials.serviceSid,
      ).verificationChecks.create({
        to: `${verifyOtpData.USER_PHONE}`,
        code: `${verifyOtpData.otp}`,
      });
      if (verifiedResponse.status === 'approved') {
        return { message: 'OTP successfully verified' };
      }
      return new IncorrectOtpError();
    } catch (error) {
      return new VerifyingOtpError();
    }
  }
}
