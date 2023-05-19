import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { VerifyingOtpError } from '@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError';

export interface VerifyOtpUsecaseInterface extends
  UseCase<VerifyOtpUsecaseInterface.Request, VerifyOtpUsecaseInterface.Response> {
  execute(verifyOtpData: VerifyOtpUsecaseInterface.Request):
  Promise<VerifyOtpUsecaseInterface.Response>;

}

export namespace VerifyOtpUsecaseInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'> & { otp: string };
  export type Response = { message: string, userAlreadyRegisted: boolean } | VerifyingOtpError;
}
