import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/SendingOtpError';

export interface SendOtpTwilioAdapterInterface {
  sendOtp(
    sendOtpData: SendOtpTwilioAdapterInterface.Request
  ): Promise<SendOtpTwilioAdapterInterface.Response>;
}

export namespace SendOtpTwilioAdapterInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type Response = string | SendingOtpError;
}
