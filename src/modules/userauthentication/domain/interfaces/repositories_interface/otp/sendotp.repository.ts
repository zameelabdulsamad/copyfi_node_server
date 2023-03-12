import { UserEntityInterface } from '@modules/userauthentication/domain/entities/user.entity';

export interface SendOtpRepositoryInterface {
  sendOtp(
    userPhone: SendOtpRepositoryInterface.Request
  ): Promise<SendOtpRepositoryInterface.Response>;
}

export namespace SendOtpRepositoryInterface {
  export type Request = Omit<UserEntityInterface, 'user_uid' | 'user_email' | 'user_fullname'>;
  export type Response = string | number;
}
