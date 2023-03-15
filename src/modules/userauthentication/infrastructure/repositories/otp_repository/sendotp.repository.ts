import { SendOtpRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/otp/sendotp.repository';
import { injectable, inject } from 'inversify';
import { SendOtpTwilioAdapterInterface } from '../../interfaces/externaladapter_interface/otp/twilio/sendotp.twilioadapter';
import 'reflect-metadata';

@injectable()
export class SendOtpRepository implements SendOtpRepositoryInterface {
  sendOtpTwilioAdapterInterface: SendOtpTwilioAdapterInterface;

  constructor(
  @inject('SendOtpTwilioAdapterInterface') sendOtpTwilioAdapterInterface: SendOtpTwilioAdapterInterface,
  ) {
    this.sendOtpTwilioAdapterInterface = sendOtpTwilioAdapterInterface;
  }

  async sendOtp(sendOtpData: SendOtpRepositoryInterface.Request):
  Promise<SendOtpRepositoryInterface.Response> {
    return this.sendOtpTwilioAdapterInterface.sendOtp(sendOtpData);
  }
}
