import { UseCase } from '@main/shared/interfaces/usecase/usecase';
import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';

export interface SendOtpUsecaseInterface extends
  UseCase<SendOtpUsecaseInterface.Request, SendOtpUsecaseInterface.Response> {
  execute(userPhone: SendOtpUsecaseInterface.Request): Promise<SendOtpUsecaseInterface.Response>;

}

export namespace SendOtpUsecaseInterface {
  export type Request = Omit<UserEntityInterface, 'user_uid' | 'user_email' | 'user_fullname'>;
  export type Response = string | number;
}
