import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/SendingOtpError';

export interface SendOtpRepositoryInterface {
  sendOtp(
    sendOtpData: SendOtpRepositoryInterface.Request
  ): Promise<SendOtpRepositoryInterface.Response>;
}

export namespace SendOtpRepositoryInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type Response = { message: string } | SendingOtpError;
}
