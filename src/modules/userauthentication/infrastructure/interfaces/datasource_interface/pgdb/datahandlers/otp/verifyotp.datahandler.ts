import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';

export interface VerifyOtpPGDBDataHandlerInterface {
  checkUserExist(
    verifyOtpData: VerifyOtpPGDBDataHandlerInterface.Request
  ): Promise<VerifyOtpPGDBDataHandlerInterface.Response>;
}

export namespace VerifyOtpPGDBDataHandlerInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'otp' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type Response = { userAlreadyRegisted: boolean } | VerifyingOtpError;
}
