import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { IncorrectOtpError } from '@modules/userauthentication/domain/errors/IncorrectOtpError';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/SendingOtpError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/VerifyingOtpError';

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
  export type SendOtpResponse = { message: string } | SendingOtpError;
  export type VerifyOtpRequest = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'> & { otp: string };
  export type VerifyOtpResponse = { message: string } | VerifyingOtpError | IncorrectOtpError;
}
