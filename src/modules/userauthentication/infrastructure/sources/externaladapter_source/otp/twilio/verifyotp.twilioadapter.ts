import env from '@main/config/env';
import { injectable } from 'inversify';
import { Twilio } from 'twilio';
import 'reflect-metadata';
import { VerifyOtpTwilioAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/source_interface/externaladapter/otp/twilio/verifyotp.twilioadapter';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';

@injectable()
export class VerifyOtpTwilioAdapter implements VerifyOtpTwilioAdapterInterface {
  private credentials: any = {
    accountSid: env.twilioConfig.twilioAccountSid,
    authToken: env.twilioConfig.twilioAuthToken,
    serviceSid: env.twilioConfig.twilioServiceSid,
  };

  async verifyOtp(
    verifyOtpData: VerifyOtpTwilioAdapterInterface.Request,
  ): Promise<VerifyOtpTwilioAdapterInterface.Response> {
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
