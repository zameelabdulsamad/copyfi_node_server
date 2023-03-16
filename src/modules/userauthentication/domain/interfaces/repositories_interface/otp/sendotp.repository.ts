import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/otp_error/SendingOtpError';

export interface SendOtpRepositoryInterface {
  sendOtp(
    sendOtpData: SendOtpRepositoryInterface.Request
  ): Promise<SendOtpRepositoryInterface.Response>;
}

export namespace SendOtpRepositoryInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'otp'>;
  export type Response = { message: string } | SendingOtpError;
}
