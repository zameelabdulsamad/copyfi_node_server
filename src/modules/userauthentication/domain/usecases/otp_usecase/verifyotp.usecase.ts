import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { VerifyOtpUsecaseInterface } from '../../interfaces/usecases_interface/otp/verifyotp.usecase';
import { UserAuthenticationRepositoryInterface } from '../../interfaces/repositories_interface/userauthentication.repository';

@injectable()
export class VerifyOtpUsecase implements VerifyOtpUsecaseInterface {
  userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface;

  constructor(
  @inject('UserAuthenticationRepositoryInterface') userAuthenticationRepositoryInterface: UserAuthenticationRepositoryInterface,
  ) {
    this.userAuthenticationRepositoryInterface = userAuthenticationRepositoryInterface;
  }

  async execute(verifyOtpData: VerifyOtpUsecaseInterface.Request):
  Promise<VerifyOtpUsecaseInterface.Response> {
    return this.userAuthenticationRepositoryInterface.verifyOtp({
      ...verifyOtpData,
    });
  }
}
