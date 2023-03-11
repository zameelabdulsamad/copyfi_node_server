import { SendOtpUsecaseInterface } from '../../interfaces/usecases_interface/otp/sendotp.usecase';
import { SendOtpRepositoryInterface } from '../../repositories/otp_repository/sendotp.repository';

export class SendOtpUsecase implements SendOtpUsecaseInterface {
  constructor(
    private sendOtpRepositoryInterface: SendOtpRepositoryInterface,
  ) {}

  async execute(userPhone: SendOtpUsecaseInterface.Request):
  Promise<SendOtpUsecaseInterface.Response> {
    return this.sendOtpRepositoryInterface.sendOtp({
      ...userPhone,
    });
  }
}
