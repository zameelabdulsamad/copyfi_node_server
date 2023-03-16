import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/otp_error/SendingOtpError';

export interface SendOtpTwilioAdapterInterface {
  sendOtp(
    sendOtpData: SendOtpTwilioAdapterInterface.Request
  ): Promise<SendOtpTwilioAdapterInterface.Response>;
}

export namespace SendOtpTwilioAdapterInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'otp'>;
  export type Response = { message: string } | SendingOtpError;
}
