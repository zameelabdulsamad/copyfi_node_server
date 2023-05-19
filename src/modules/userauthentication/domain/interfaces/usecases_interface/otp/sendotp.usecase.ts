import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';
import { SendingOtpError } from '@modules/userauthentication/domain/errors/otp_error/SendingOtpError';

export interface SendOtpUsecaseInterface extends
  UseCase<SendOtpUsecaseInterface.Request, SendOtpUsecaseInterface.Response> {
  execute(sendOtpData: SendOtpUsecaseInterface.Request): Promise<SendOtpUsecaseInterface.Response>;

}

export namespace SendOtpUsecaseInterface {
  export type Request = Omit<UserEntityInterface, 'USER_UID' | 'USER_EMAIL' | 'USER_FULLNAME'>;
  export type Response = { status:string, message: string } | SendingOtpError;
}
