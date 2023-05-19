import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/otp_error/SendingOtpError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';

export interface TwilioExternalAdapterInterface {
  sendOtp(
    sendOtpData: TwilioExternalAdapterInterface.SendOtpRequest
  ): Promise<TwilioExternalAdapterInterface.SendOtpResponse>;

  verifyOtp(
    verifyOtpData: TwilioExternalAdapterInterface.VerifyOtpRequest
  ): Promise<TwilioExternalAdapterInterface.VerifyOtpResponse>;
}

export namespace TwilioExternalAdapterInterface {
  export type SendOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type SendOtpResponse = { status:string, message: string } | SendingOtpError;

  export type VerifyOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'> & { otp: string };
  export type VerifyOtpResponse = { message: string } | VerifyingOtpError;
}
