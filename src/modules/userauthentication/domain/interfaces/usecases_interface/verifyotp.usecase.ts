import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { IncorrectOtpError } from '@modules/userauthentication/domain/errors/IncorrectOtpError';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/VerifyingOtpError';

export interface VerifyOtpUsecaseInterface extends
  UseCase<VerifyOtpUsecaseInterface.Request, VerifyOtpUsecaseInterface.Response> {
  execute(verifyOtpData: VerifyOtpUsecaseInterface.Request):
  Promise<VerifyOtpUsecaseInterface.Response>;

}

export namespace VerifyOtpUsecaseInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME' | 'USER_REFRESHTOKEN'> & { otp: string };
  export type ResponseDataType = Partial<{
    refreshToken: string;
    token: string;
    userAlreadyRegistered: boolean;
  }>;
  export type Response = { message: string, data: ResponseDataType } | VerifyingOtpError
  | IncorrectOtpError;
}
