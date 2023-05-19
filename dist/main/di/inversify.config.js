"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sl = void 0;
const user_datamodelentity_1 = require("@main/db/pg/datamodelentities/user.datamodelentity");
const ormconfig_1 = require("@main/db/pg/setup/ormconfig");
const authenticateuser_usecase_1 = require("@modules/userauthentication/domain/usecases/authenticateuser_usecase/authenticateuser.usecase");
const loginuser_usecase_1 = require("@modules/userauthentication/domain/usecases/loginuser_usecase/loginuser.usecase");
const sendotp_usecase_1 = require("@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase");
const verifyotp_usecase_1 = require("@modules/userauthentication/domain/usecases/otp_usecase/verifyotp.usecase");
const registeruser_usecase_1 = require("@modules/userauthentication/domain/usecases/registeruser_usecase/registeruser.usecase");
const userauthentication_datahandler_1 = require("@modules/userauthentication/infrastructure/datasources/pgdb_datasource/datahandlers/userauthentication.datahandler");
const sendotp_twilioadapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter");
const verifyotp_twilioadapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/verifyotp.twilioadapter");
const jwt_externaladapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/token_externaladapter/jwt/jwt.externaladapter");
const userauthentication_repository_1 = require("@modules/userauthentication/infrastructure/repositories/userauthentication.repository");
const inversify_1 = require("inversify");
exports.sl = new inversify_1.Container();
// MODULE-USERAUTHENTICATION
//  UseCase
exports.sl.bind('SendOtpUsecaseInterface').to(sendotp_usecase_1.SendOtpUsecase);
exports.sl.bind('VerifyOtpUsecaseInterface').to(verifyotp_usecase_1.VerifyOtpUsecase);
exports.sl.bind('RegisterUserUsecaseInterface').to(registeruser_usecase_1.RegisterUserUsecase);
exports.sl.bind('LoginUserUsecaseInterface').to(loginuser_usecase_1.LoginUserUsecase);
exports.sl.bind('AuthenticateUserUsecaseInterface').to(authenticateuser_usecase_1.AuthenticateUserUsecase);
//  Repository
exports.sl.bind('UserAuthenticationRepositoryInterface').to(userauthentication_repository_1.UserAuthenticationRepository);
//  DataSource
exports.sl.bind('UserAuthenticationPGDBDataHandlerInterface').to(userauthentication_datahandler_1.UserAuthenticationPGDBDataHandler);
//  ExternalAdapters
exports.sl.bind('SendOtpTwilioAdapterInterface').to(sendotp_twilioadapter_1.SendOtpTwilioAdapter);
exports.sl.bind('VerifyOtpTwilioAdapterInterface').to(verifyotp_twilioadapter_1.VerifyOtpTwilioAdapter);
exports.sl.bind('JwtExternalAdapterInterface').to(jwt_externaladapter_1.JwtExternalAdapter);
//  MAIN
exports.sl.bind('DataSource').toConstantValue(ormconfig_1.appDataSource);
exports.sl.bind('UserDataModelEntityRepository').toDynamicValue((context) => context.container.get('DataSource').getRepository(user_datamodelentity_1.UserDataModelEntity));
//# sourceMappingURL=inversify.config.js.map