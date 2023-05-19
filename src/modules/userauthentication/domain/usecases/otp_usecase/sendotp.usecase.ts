import { injectable, inject } from 'inversify';
import { SendOtpUsecaseInterface } from '../../interfaces/usecases_interface/otp/sendotp.usecase';
import 'reflect-metadata';
import { UserAuthenticationRepositoryInterface } from '../../interfaces/repositories_interface/userauthentication.repository';

@injectable()
export class SendOtpUsecase implements SendOtpUsecaseInterface {
  userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface;

  constructor(
  @inject('UserAuthenticationRepositoryInterface') userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface,
  ) {
    this.userAuthenticationRepositoryInterface = userAuthenticationRepositoryInterface;
  }

  async execute(sendOtpData: SendOtpUsecaseInterface.Request):
  Promise<SendOtpUsecaseInterface.Response> {
    return this.userAuthenticationRepositoryInterface.sendOtp({
      ...sendOtpData,
    });
  }
}
