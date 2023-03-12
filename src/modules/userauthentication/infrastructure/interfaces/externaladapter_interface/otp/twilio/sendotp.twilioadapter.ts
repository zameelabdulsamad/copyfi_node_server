import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';

export interface SendOtpTwilioAdapterInterface {
  sendOtp(
    userPhone: SendOtpTwilioAdapterInterface.Request
  ): Promise<SendOtpTwilioAdapterInterface.Response>;
}

export namespace SendOtpTwilioAdapterInterface {
  export type Request = Omit<UserEntityInterface, 'user_uid' | 'user_email' | 'user_fullname'>;
  export type Response = string | number;
}
