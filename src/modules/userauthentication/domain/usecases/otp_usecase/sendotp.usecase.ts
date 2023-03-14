import { injectable, inject } from 'inversify';
import { SendOtpUsecaseInterface } from '../../interfaces/usecases_interface/otp/sendotp.usecase';
import { SendOtpRepositoryInterface } from '../../interfaces/repositories_interface/otp/sendotp.repository';
import 'reflect-metadata';

@injectable()
export class SendOtpUsecase implements SendOtpUsecaseInterface {
  sendOtpRepositoryInterface: SendOtpRepositoryInterface;

  constructor(
  @inject('SendOtpRepositoryInterface') sendOtpRepositoryInterface: SendOtpRepositoryInterface,
  ) {
    this.sendOtpRepositoryInterface = sendOtpRepositoryInterface;
  }

  async execute(userPhone: SendOtpUsecaseInterface.Request):
  Promise<SendOtpUsecaseInterface.Response> {
    return this.sendOtpRepositoryInterface.sendOtp({
      ...userPhone,
    });
  }
}
