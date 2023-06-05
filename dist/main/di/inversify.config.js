"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sl = void 0;
const printjob_datamodelentity_1 = require("@main/db/pg/datamodelentities/printjob.datamodelentity");
const user_datamodelentity_1 = require("@main/db/pg/datamodelentities/user.datamodelentity");
const ormconfig_1 = require("@main/db/pg/setup/ormconfig");
const newprintjob_usecase_1 = require("@modules/print/domain/usecases/newprintjob.usecase");
const print_datahandler_1 = require("@modules/print/infrastructure/datasources/pgdb_datasource/datahandlers/print.datahandler");
const awss3_externaladapter_1 = require("@modules/print/infrastructure/externaladapters/storage_externaladapter/AWSs3/awss3.externaladapter");
const print_repository_1 = require("@modules/print/infrastructure/repositories/print.repository");
const authenticateuser_usecase_1 = require("@modules/userauthentication/domain/usecases/authenticateuser.usecase");
const sendotp_usecase_1 = require("@modules/userauthentication/domain/usecases/sendotp.usecase");
const verifyotp_usecase_1 = require("@modules/userauthentication/domain/usecases/verifyotp.usecase");
const registeruser_usecase_1 = require("@modules/userauthentication/domain/usecases/registeruser.usecase");
const userauthentication_datahandler_1 = require("@modules/userauthentication/infrastructure/datasources/pgdb_datasource/datahandlers/userauthentication.datahandler");
const twilio_externaladapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/twilio.externaladapter");
const jwt_externaladapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/token_externaladapter/jwt/jwt.externaladapter");
const userauthentication_repository_1 = require("@modules/userauthentication/infrastructure/repositories/userauthentication.repository");
const inversify_1 = require("inversify");
const refreshtoken_usecase_1 = require("@modules/userauthentication/domain/usecases/refreshtoken.usecase");
exports.sl = new inversify_1.Container();
// MODULE-USERAUTHENTICATION
//  UseCase
exports.sl.bind('SendOtpUsecaseInterface').to(sendotp_usecase_1.SendOtpUsecase);
exports.sl.bind('VerifyOtpUsecaseInterface').to(verifyotp_usecase_1.VerifyOtpUsecase);
exports.sl.bind('RegisterUserUsecaseInterface').to(registeruser_usecase_1.RegisterUserUsecase);
exports.sl.bind('AuthenticateUserUsecaseInterface').to(authenticateuser_usecase_1.AuthenticateUserUsecase);
exports.sl.bind('RefreshTokenUsecaseInterface').to(refreshtoken_usecase_1.RefreshTokenUsecase);
//  Repository
exports.sl.bind('UserAuthenticationRepositoryInterface').to(userauthentication_repository_1.UserAuthenticationRepository);
//  DataSource
exports.sl.bind('UserAuthenticationPGDBDataHandlerInterface').to(userauthentication_datahandler_1.UserAuthenticationPGDBDataHandler);
//  ExternalAdapters
exports.sl.bind('TwilioExternalAdapterInterface').to(twilio_externaladapter_1.TwilioExternalAdapter);
exports.sl.bind('JwtExternalAdapterInterface').to(jwt_externaladapter_1.JwtExternalAdapter);
// MODULE-PRINT
//  UseCase
exports.sl.bind('NewPrintJobUsecaseInterface').to(newprintjob_usecase_1.NewPrintJobUsecase);
//  Repository
exports.sl.bind('PrintRepositoryInterface').to(print_repository_1.PrintRepository);
//  DataSource
exports.sl.bind('PrintPGDBDataHandlerInterface').to(print_datahandler_1.PrintPGDBDataHandler);
//  ExternalAdapters
exports.sl.bind('AWSS3ExternalAdapterInterface').to(awss3_externaladapter_1.AWSS3ExternalAdapter);
//  MAIN
exports.sl.bind('DataSource').toConstantValue(ormconfig_1.appDataSource);
exports.sl.bind('UserDataModelEntityRepository').toDynamicValue((context) => context.container.get('DataSource').getRepository(user_datamodelentity_1.UserDataModelEntity));
exports.sl.bind('PrintJobDataModelEntityRepository').toDynamicValue((context) => context.container.get('DataSource').getRepository(printjob_datamodelentity_1.PrintJobDataModelEntity));
//# sourceMappingURL=inversify.config.js.map