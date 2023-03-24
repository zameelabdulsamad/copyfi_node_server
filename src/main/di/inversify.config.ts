import { UserDataModelEntity } from '@main/db/pg/datamodelentities/user.datamodelentity';
import { appDataSource } from '@main/db/pg/setup/ormconfig';
import { LoginUserRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/login/loginuser.repository';
import { SendOtpRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/otp/sendotp.repository';
import { VerifyOtpRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/otp/verifyotp.repository';
import { RegisterUserRepositoryInterface } from '@modules/userauthentication/domain/interfaces/repositories_interface/registeruser/registeruser.repository';
import { LoginUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/loginuser/loginuser.usecase';
import { SendOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/sendotp.usecase';
import { VerifyOtpUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/otp/verifyotp.usecase';
import { RegisterUserUsecaseInterface } from '@modules/userauthentication/domain/interfaces/usecases_interface/registeruser/registeruser.usecase';
import { LoginUserUsecase } from '@modules/userauthentication/domain/usecases/loginuser_usecase/loginuser.usecase';
import { SendOtpUsecase } from '@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase';
import { VerifyOtpUsecase } from '@modules/userauthentication/domain/usecases/otp_usecase/verifyotp.usecase';
import { RegisterUserUsecase } from '@modules/userauthentication/domain/usecases/registeruser_usecase/registeruser.usecase';
import { LoginUserPGDBDataHandler } from '@modules/userauthentication/infrastructure/datasources/pgdb_datasource/datahandlers/login/loginuser.datahandler';
import { VerifyOtpPGDBDataHandler } from '@modules/userauthentication/infrastructure/datasources/pgdb_datasource/datahandlers/otp/verifyotp.datahandler';
import { RegisterUserPGDBDataHandler } from '@modules/userauthentication/infrastructure/datasources/pgdb_datasource/datahandlers/register/register.datahandler';
import { SendOtpTwilioAdapter } from '@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter';
import { VerifyOtpTwilioAdapter } from '@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/verifyotp.twilioadapter';
import { GenerateTokenJwtAdapter } from '@modules/userauthentication/infrastructure/externaladapters/token_externaladapter/jwt/generatetoken.jwtadapter';
import { LoginUserPGDBDataHandlerInterface } from '@modules/userauthentication/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/login/loginuser.datahandler';
import { VerifyOtpPGDBDataHandlerInterface } from '@modules/userauthentication/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/otp/verifyotp.datahandler';
import { RegisterUserPGDBDataHandlerInterface } from '@modules/userauthentication/infrastructure/interfaces/datasource_interface/pgdb/datahandlers/register/register.datahandler';
import { GenerateTokenJwtAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/jwt/generatetoken.jwtadapter';
import { SendOtpTwilioAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/twilio/sendotp.twilioadapter';
import { VerifyOtpTwilioAdapterInterface } from '@modules/userauthentication/infrastructure/interfaces/externaladapter_interface/twilio/verifyotp.twilioadapter';
import { LoginUserRepository } from '@modules/userauthentication/infrastructure/repositories/login_repository/loginuser.repository';
import { SendOtpRepository } from '@modules/userauthentication/infrastructure/repositories/otp_repository/sendotp.repository';
import { VerifyOtpRepository } from '@modules/userauthentication/infrastructure/repositories/otp_repository/verifyotp.repository';
import { RegisterUserRepository } from '@modules/userauthentication/infrastructure/repositories/registeruser_repository/registeruser.repository';
import { Container } from 'inversify';
import { DataSource, Repository } from 'typeorm';

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
verifyOtpContainer.bind<DataSource>('DataSource').toConstantValue(appDataSource);
verifyOtpContainer.bind<Repository<UserDataModelEntity>>('UserDataModelEntityRepository').toDynamicValue(
  (context) => context.container.get<DataSource>('DataSource').getRepository(UserDataModelEntity),
);
verifyOtpContainer.bind<VerifyOtpPGDBDataHandlerInterface>('VerifyOtpPGDBDataHandlerInterface').to(VerifyOtpPGDBDataHandler);

verifyOtpContainer.bind<VerifyOtpTwilioAdapterInterface>('VerifyOtpTwilioAdapterInterface').to(VerifyOtpTwilioAdapter);
verifyOtpContainer.bind<VerifyOtpRepositoryInterface>('VerifyOtpRepositoryInterface').to(VerifyOtpRepository);
verifyOtpContainer.bind<VerifyOtpUsecaseInterface>('VerifyOtpUsecaseInterface').to(VerifyOtpUsecase);

// CONTAINER-VERIFYOTP

// USECASE-OTP

/* ******************************************************************************************** */

// USECASE-REGISTER

// CONTAINER-REGISTERUSER

export const registerUserContainer = new Container();
registerUserContainer.bind<DataSource>('DataSource').toConstantValue(appDataSource);
registerUserContainer.bind<Repository<UserDataModelEntity>>('UserDataModelEntityRepository').toDynamicValue(
  (context) => context.container.get<DataSource>('DataSource').getRepository(UserDataModelEntity),
);
registerUserContainer.bind<RegisterUserPGDBDataHandlerInterface>('RegisterUserPGDBDataHandlerInterface').to(RegisterUserPGDBDataHandler);
registerUserContainer.bind<RegisterUserRepositoryInterface>('RegisterUserRepositoryInterface').to(RegisterUserRepository);
registerUserContainer.bind<RegisterUserUsecaseInterface>('RegisterUserUsecaseInterface').to(RegisterUserUsecase);

// CONTAINER-REGISTERUSER

// USECASE-REGISTER

/* ******************************************************************************************** */

// USECASE-LOGIN

// CONTAINER-LOGINUSER

export const loginUserContainer = new Container();
loginUserContainer.bind<DataSource>('DataSource').toConstantValue(appDataSource);
loginUserContainer.bind<Repository<UserDataModelEntity>>('UserDataModelEntityRepository').toDynamicValue(
  (context) => context.container.get<DataSource>('DataSource').getRepository(UserDataModelEntity),
);
loginUserContainer.bind<LoginUserPGDBDataHandlerInterface>('LoginUserPGDBDataHandlerInterface').to(LoginUserPGDBDataHandler);
loginUserContainer.bind<GenerateTokenJwtAdapterInterface>('GenerateTokenJwtAdapterInterface').to(GenerateTokenJwtAdapter);
loginUserContainer.bind<LoginUserRepositoryInterface>('LoginUserRepositoryInterface').to(LoginUserRepository);
loginUserContainer.bind<LoginUserUsecaseInterface>('LoginUserUsecaseInterface').to(LoginUserUsecase);

// CONTAINER-LOGINUSER

// USECASE-LOGIN

// MODULE-USERAUTHENTICATION
