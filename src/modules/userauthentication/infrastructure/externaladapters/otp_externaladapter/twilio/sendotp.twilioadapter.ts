import env from '@main/config/env';
import { Twilio } from 'twilio';

class SendOtpTwilioAdapter {
  private credentials: any = {
    accountSid: env.twilioConfig.twilioAccountSid,
    authToken: env.twilioConfig.twilioAuthToken,
    serviceSid: env.twilioConfig.twilioServiceSid,
  };

  async sendOtp(userPhone:string): Promise<string> {
    const client = new Twilio(this.credentials.accountSid, this.credentials.authToken);
    client.verify.v2.services(this.credentials.serviceSid).verifications.create({
      to: `${userPhone}`,
      channel: 'sms',
    });
    return 'OTP SENT';
  }
}

export default new SendOtpTwilioAdapter();
