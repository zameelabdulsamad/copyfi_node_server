import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { IncorrectOtpError } from '@modules/userauthentication/domain/errors/IncorrectOtpError';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/SendingOtpError';
import { TwilioAPIError } from '@modules/userauthentication/domain/errors/twilioapi.error';

export interface TwilioExternalAdapterInterface {
  sendOtp(
    sendOtpData: TwilioExternalAdapterInterface.SendOtpRequest
  ): Promise<TwilioExternalAdapterInterface.SendOtpResponse>;

  verifyOtp(
    verifyOtpData: TwilioExternalAdapterInterface.VerifyOtpRequest
  ): Promise<TwilioExternalAdapterInterface.VerifyOtpResponse>;
}

export namespace TwilioExternalAdapterInterface {
  export type SendOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_REFRESHTOKEN'>;
  export type SendOtpResponse = { success: boolean } | SendingOtpError | TwilioAPIError;
  export type VerifyOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_REFRESHTOKEN'> & { otp: string };
  export type VerifyOtpResponse = { success: boolean } | TwilioAPIError | IncorrectOtpError;
}
