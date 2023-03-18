import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';

export interface VerifyOtpRepositoryInterface {
  verifyOtp(
    verifyOtpData: VerifyOtpRepositoryInterface.Request
  ): Promise<VerifyOtpRepositoryInterface.Response>;
}

export namespace VerifyOtpRepositoryInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type Response = { message: string, userAlreadyRegisted: boolean } | VerifyingOtpError;
}
