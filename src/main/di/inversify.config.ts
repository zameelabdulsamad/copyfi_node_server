import { SendOtpRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/otp/sendotp.repository';
import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/sendotp.usecase';
import { SendOtpUsecase } from '@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase';
import { SendOtpTwilioAdapter } from '@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter';
import { SendOtpTwilioAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/otp/twilio/sendotp.twilioadapter';
import { SendOtpRepository } from '@modules/userauthentication/infrastructure/repositories/otp_repository/sendotp.repository';
import { Container } from 'inversify';

// MODULE-USERAUTHENTICATION

// USECASE-SENDOTP

export const sendOtpContainer = new Container();
sendOtpContainer.bind<SendOtpTwilioAdapterInterface>('SendOtpTwilioAdapterInterface').to(SendOtpTwilioAdapter);
sendOtpContainer.bind<SendOtpRepositoryInterface>('SendOtpRepositoryInterface').to(SendOtpRepository);
sendOtpContainer.bind<SendOtpUsecaseInterface>('SendOtpUsecaseInterface').to(SendOtpUsecase);

// USECASE-SENDOTP

// MODULE-USERAUTHENTICATION
