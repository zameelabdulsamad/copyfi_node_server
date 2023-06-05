import { PrintJobDataModelEntity } from '@main/db/pg/datamodelentities/printjob.datamodelentity';
import { UserDataModelEntity } from '@main/db/pg/datamodelentities/user.datamodelentity';
import { appDataSource } from '@main/db/pg/setup/ormconfig';
import { PrintRepositoryInterface } from '@modules/print/domain/interfaces/repositories/print.repository';
import { NewPrintJobUsecaseInterface } from '@modules/print/domain/interfaces/usecases/newprintjob.usecase';
import { NewPrintJobUsecase } from '@modules/print/domain/usecases/newprintjob.usecase';
import { PrintPGDBDataHandler } from '@modules/print/infrastructure/datasources/pgdb_datasource/datahandlers/print.datahandler';
import { AWSS3ExternalAdapter } from '@modules/print/infrastructure/externaladapters/storage_externaladapter/AWSs3/awss3.externaladapter';
import { PrintPGDBDataHandlerInterface } from '@modules/print/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/print.datahandler';
import { AWSS3ExternalAdapterInterface } from '@modules/print/infrastructure/interfaces/externaladapter_interface/storage/AWSs3/awss3.externaladapter';
import { PrintRepository } from '@modules/print/infrastructure/repositories/print.repository';
import { UserAuthenticationRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/userauthentication.repository';
import { AuthenticateUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/authenticateuser.usecase';
import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/sendotp.usecase';
import { VerifyOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/verifyotp.usecase';
import { RegisterUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/registeruser.usecase';
import { AuthenticateUserUsecase } from '@modules/userauthentication/domain/usecases/authenticateuser.usecase';
import { SendOtpUsecase } from '@modules/userauthentication/domain/usecases/sendotp.usecase';
import { VerifyOtpUsecase } from '@modules/userauthentication/domain/usecases/verifyotp.usecase';
import { RegisterUserUsecase } from '@modules/userauthentication/domain/usecases/registeruser.usecase';
import { UserAuthenticationPGDBDataHandler } from '@modules/userauthentication/infrastructure/datasources/pgdb_datasource/datahandlers/userauthentication.datahandler';
import { TwilioExternalAdapter } from '@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/twilio.externaladapter';
import { JwtExternalAdapter } from '@modules/userauthentication/infrastructure/externaladapters/token_externaladapter/jwt/jwt.externaladapter';
import { UserAuthenticationPGDBDataHandlerInterface } from '@modules/userauthentication/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/userauthentication.datahandler';
import { TwilioExternalAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/otp/twilio/twilio.externaladapter';
import { JwtExternalAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/token/jwt/jwt.externaladapter';
import { UserAuthenticationRepository } from '@modules/userauthentication/infrastructure/repositories/userauthentication.repository';

import { Container } from 'inversify';
import { DataSource, Repository } from 'typeorm';
import { RefreshTokenUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/refreshtoken.usecase';
import { RefreshTokenUsecase } from '@modules/userauthentication/domain/usecases/refreshtoken.usecase';

export const sl = new Container();

// MODULE-USERAUTHENTICATION

//  UseCase
sl.bind<SendOtpUsecaseInterface>('SendOtpUsecaseInterface').to(SendOtpUsecase);
sl.bind<VerifyOtpUsecaseInterface>('VerifyOtpUsecaseInterface').to(VerifyOtpUsecase);
sl.bind<RegisterUserUsecaseInterface>('RegisterUserUsecaseInterface').to(RegisterUserUsecase);
sl.bind<AuthenticateUserUsecaseInterface>('AuthenticateUserUsecaseInterface').to(AuthenticateUserUsecase);
sl.bind<RefreshTokenUsecaseInterface>('RefreshTokenUsecaseInterface').to(RefreshTokenUsecase);

//  Repository
sl.bind<UserAuthenticationRepositoryInterface>('UserAuthenticationRepositoryInterface').to(UserAuthenticationRepository);

//  DataSource
sl.bind<UserAuthenticationPGDBDataHandlerInterface>('UserAuthenticationPGDBDataHandlerInterface').to(UserAuthenticationPGDBDataHandler);

//  ExternalAdapters
sl.bind<TwilioExternalAdapterInterface>('TwilioExternalAdapterInterface').to(TwilioExternalAdapter);
sl.bind<JwtExternalAdapterInterface>('JwtExternalAdapterInterface').to(JwtExternalAdapter);

// MODULE-PRINT

//  UseCase
sl.bind<NewPrintJobUsecaseInterface>('NewPrintJobUsecaseInterface').to(NewPrintJobUsecase);

//  Repository
sl.bind<PrintRepositoryInterface>('PrintRepositoryInterface').to(PrintRepository);

//  DataSource
sl.bind<PrintPGDBDataHandlerInterface>('PrintPGDBDataHandlerInterface').to(PrintPGDBDataHandler);

//  ExternalAdapters
sl.bind<AWSS3ExternalAdapterInterface>('AWSS3ExternalAdapterInterface').to(AWSS3ExternalAdapter);

//  MAIN
sl.bind<DataSource>('DataSource').toConstantValue(appDataSource);
sl.bind<Repository<UserDataModelEntity>>('UserDataModelEntityRepository').toDynamicValue(
  (context) => context.container.get<DataSource>('DataSource').getRepository(UserDataModelEntity),
);
sl.bind<Repository<PrintJobDataModelEntity>>('PrintJobDataModelEntityRepository').toDynamicValue(
  (context) => context.container.get<DataSource>('DataSource').getRepository(PrintJobDataModelEntity),
);
