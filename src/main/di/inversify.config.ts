import { SendOtpRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/otp/sendotp.repository';
import { VerifyOtpRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/otp/verifyotp.repository';
import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/sendotp.usecase';
import { VerifyOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/verifyotp.usecase';
import { SendOtpUsecase } from '@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase';
import { VerifyOtpUsecase } from '@modules/userauthentication/domain/usecases/otp_usecase/verifyotp.usecase';
import { SendOtpTwilioAdapter } from '@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter';
import { VerifyOtpTwilioAdapter } from '@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/verifyotp.twilioadapter';
import { SendOtpTwilioAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/otp/twilio/sendotp.twilioadapter';
import { VerifyOtpTwilioAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/otp/twilio/verifyotp.twilioadapter';
import { SendOtpRepository } from '@modules/userauthentication/infrastructure/repositories/otp_repository/sendotp.repository';
import { VerifyOtpRepository } from '@modules/userauthentication/infrastructure/repositories/otp_repository/verifyotp.repository';
import { Container } from 'inversify';

// MODULE-USERAUTHENTICATION

// USECASE-OTP

// CONTAINER-SENTOTP

export const sendOtpContainer = new Container();
sendOtpContainer.bind<SendOtpTwilioAdapterInterface>('SendOtpTwilioAdapterInterface').to(SendOtpTwilioAdapter);
sendOtpContainer.bind<SendOtpRepositoryInterface>('SendOtpRepositoryInterface').to(SendOtpRepository);
sendOtpContainer.bind<SendOtpUsecaseInterface>('SendOtpUsecaseInterface').to(SendOtpUsecase);

// CONTAINER-SENTOTP

// CONTAINER-VERIFYOTP

export const verifyOtpContainer = new Container();
verifyOtpContainer.bind<VerifyOtpTwilioAdapterInterface>('VerifyOtpTwilioAdapterInterface').to(VerifyOtpTwilioAdapter);
verifyOtpContainer.bind<VerifyOtpRepositoryInterface>('VerifyOtpRepositoryInterface').to(VerifyOtpRepository);
verifyOtpContainer.bind<VerifyOtpUsecaseInterface>('VerifyOtpUsecaseInterface').to(VerifyOtpUsecase);

// CONTAINER-VERIFYOTP

// USECASE-OTP

// MODULE-USERAUTHENTICATION
