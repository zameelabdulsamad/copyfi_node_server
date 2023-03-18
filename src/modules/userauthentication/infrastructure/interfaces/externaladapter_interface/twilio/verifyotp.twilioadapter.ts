import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';

export interface VerifyOtpTwilioAdapterInterface {
  verifyOtp(
    verifyOtpData: VerifyOtpTwilioAdapterInterface.Request
  ): Promise<VerifyOtpTwilioAdapterInterface.Response>;
}

export namespace VerifyOtpTwilioAdapterInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type Response = { message: string } | VerifyingOtpError;
}
