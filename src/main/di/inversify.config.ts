import { UserDataModelEntity } from '@main/db/pg/datamodelentities/user.datamodelentity';
import { appDataSource } from '@main/db/pg/setup/ormconfig';
import { UserAuthenticationRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/userauthentication.repository';
import { AuthenticateUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/authenticateuser/authenticateuser.usecase';
import { LoginUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/loginuser/loginuser.usecase';
import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/sendotp.usecase';
import { VerifyOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/verifyotp.usecase';
import { RegisterUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/registeruser/registeruser.usecase';
import { AuthenticateUserUsecase } from '@modules/userauthentication/domain/usecases/authenticateuser_usecase/authenticateuser.usecase';
import { LoginUserUsecase } from '@modules/userauthentication/domain/usecases/loginuser_usecase/loginuser.usecase';
import { SendOtpUsecase } from '@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase';
import { VerifyOtpUsecase } from '@modules/userauthentication/domain/usecases/otp_usecase/verifyotp.usecase';
import { RegisterUserUsecase } from '@modules/userauthentication/domain/usecases/registeruser_usecase/registeruser.usecase';
import { UserAuthenticationPGDBDataHandler } from '@modules/userauthentication/infrastructure/datasources/pgdb_datasource/datahandlers/userauthentication.datahandler';
import { TwilioExternalAdapter } from '@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/twilio.externaladapter';
import { JwtExternalAdapter } from '@modules/userauthentication/infrastructure/externaladapters/token_externaladapter/jwt/jwt.externaladapter';
import { UserAuthenticationPGDBDataHandlerInterface } from '@modules/userauthentication/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/userauthentication.datahandler';
import { TwilioExternalAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/otp/twilio/twilio.externaladapter';
import { JwtExternalAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/token/jwt/jwt.externaladapter';
import { UserAuthenticationRepository } from '@modules/userauthentication/infrastructure/repositories/userauthentication.repository';

import { Container } from 'inversify';
import { DataSource, Repository } from 'typeorm';

export const sl = new Container();

// MODULE-USERAUTHENTICATION

//  UseCase
sl.bind<SendOtpUsecaseInterface>('SendOtpUsecaseInterface').to(SendOtpUsecase);
sl.bind<VerifyOtpUsecaseInterface>('VerifyOtpUsecaseInterface').to(VerifyOtpUsecase);
sl.bind<RegisterUserUsecaseInterface>('RegisterUserUsecaseInterface').to(RegisterUserUsecase);
sl.bind<LoginUserUsecaseInterface>('LoginUserUsecaseInterface').to(LoginUserUsecase);
sl.bind<AuthenticateUserUsecaseInterface>('AuthenticateUserUsecaseInterface').to(AuthenticateUserUsecase);

//  Repository
sl.bind<UserAuthenticationRepositoryInterface>('UserAuthenticationRepositoryInterface').to(UserAuthenticationRepository);

//  DataSource
sl.bind<UserAuthenticationPGDBDataHandlerInterface>('UserAuthenticationPGDBDataHandlerInterface').to(UserAuthenticationPGDBDataHandler);

//  ExternalAdapters
sl.bind<TwilioExternalAdapterInterface>('TwilioExternalAdapterInterface').to(TwilioExternalAdapter);
sl.bind<JwtExternalAdapterInterface>('JwtExternalAdapterInterface').to(JwtExternalAdapter);

//  MAIN
sl.bind<DataSource>('DataSource').toConstantValue(appDataSource);
sl.bind<Repository<UserDataModelEntity>>('UserDataModelEntityRepository').toDynamicValue(
  (context) => context.container.get<DataSource>('DataSource').getRepository(UserDataModelEntity),
);
