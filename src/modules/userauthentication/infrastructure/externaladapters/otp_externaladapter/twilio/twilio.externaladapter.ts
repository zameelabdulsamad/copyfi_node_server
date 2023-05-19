import env from '@main/config/env';
import { injectable } from 'inversify';
import { Twilio } from 'twilio';
import 'reflect-metadata';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/otp_error/SendingOtpError';
import { TwilioExternalAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/otp/twilio/twilio.externaladapter';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';

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
        return { message: 'OTP has been sent successfully', status: 'success' };
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
        return { message: 'OTP Verified' };
      }
      return { message: 'Incorrect OTP' };
    } catch (error) {
      return new VerifyingOtpError();
    }
  }
}