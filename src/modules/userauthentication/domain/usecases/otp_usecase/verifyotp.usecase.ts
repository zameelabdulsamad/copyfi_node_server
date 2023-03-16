import { injectable, inject } from 'inversify';
import 'reflect-metadata';
import { VerifyOtpRepositoryInterface } from '../../interfaces/repositories_interface/otp/verifyotp.repository';
import { VerifyOtpUsecaseInterface } from '../../interfaces/usecases_interface/otp/verifyotp.usecase';

@injectable()
export class VerifyOtpUsecase implements VerifyOtpUsecaseInterface {
  verifyOtpRepositoryInterface: VerifyOtpRepositoryInterface;

  constructor(
  @inject('VerifyOtpRepositoryInterface') verifyOtpRepositoryInterface: VerifyOtpRepositoryInterface,
  ) {
    this.verifyOtpRepositoryInterface = verifyOtpRepositoryInterface;
  }

  async execute(verifyOtpData: VerifyOtpRepositoryInterface.Request):
  Promise<VerifyOtpRepositoryInterface.Response> {
    return this.verifyOtpRepositoryInterface.verifyOtp({
      ...verifyOtpData,
    });
  }
}
