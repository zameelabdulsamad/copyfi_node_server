"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserContainer = exports.verifyOtpContainer = exports.sendOtpContainer = void 0;
const user_datamodelentity_1 = require("@main/db/pg/datamodelentities/user.datamodelentity");
const ormconfig_1 = require("@main/db/pg/setup/ormconfig");
const sendotp_usecase_1 = require("@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase");
const verifyotp_usecase_1 = require("@modules/userauthentication/domain/usecases/otp_usecase/verifyotp.usecase");
const registeruser_usecase_1 = require("@modules/userauthentication/domain/usecases/registeruser_usecase/registeruser.usecase");
const verifyotp_datahandler_1 = require("@modules/userauthentication/infrastructure/datasources/pgdb_datasource/datahandlers/otp/verifyotp.datahandler");
const register_datahandler_1 = require("@modules/userauthentication/infrastructure/datasources/pgdb_datasource/datahandlers/register/register.datahandler");
const sendotp_twilioadapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter");
const verifyotp_twilioadapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/verifyotp.twilioadapter");
const sendotp_repository_1 = require("@modules/userauthentication/infrastructure/repositories/otp_repository/sendotp.repository");
const verifyotp_repository_1 = require("@modules/userauthentication/infrastructure/repositories/otp_repository/verifyotp.repository");
const registeruser_repository_1 = require("@modules/userauthentication/infrastructure/repositories/registeruser_repository/registeruser.repository");
const inversify_1 = require("inversify");
// MODULE-USERAUTHENTICATION
// USECASE-OTP
// CONTAINER-SENTOTP
exports.sendOtpContainer = new inversify_1.Container();
exports.sendOtpContainer.bind('SendOtpTwilioAdapterInterface').to(sendotp_twilioadapter_1.SendOtpTwilioAdapter);
exports.sendOtpContainer.bind('SendOtpRepositoryInterface').to(sendotp_repository_1.SendOtpRepository);
exports.sendOtpContainer.bind('SendOtpUsecaseInterface').to(sendotp_usecase_1.SendOtpUsecase);
// CONTAINER-SENTOTP
// CONTAINER-VERIFYOTP
exports.verifyOtpContainer = new inversify_1.Container();
exports.verifyOtpContainer.bind('DataSource').toConstantValue(ormconfig_1.appDataSource);
exports.verifyOtpContainer.bind('UserDataModelEntityRepository').toDynamicValue((context) => context.container.get('DataSource').getRepository(user_datamodelentity_1.UserDataModelEntity));
exports.verifyOtpContainer.bind('VerifyOtpPGDBDataHandlerInterface').to(verifyotp_datahandler_1.VerifyOtpPGDBDataHandler);
exports.verifyOtpContainer.bind('VerifyOtpTwilioAdapterInterface').to(verifyotp_twilioadapter_1.VerifyOtpTwilioAdapter);
exports.verifyOtpContainer.bind('VerifyOtpRepositoryInterface').to(verifyotp_repository_1.VerifyOtpRepository);
exports.verifyOtpContainer.bind('VerifyOtpUsecaseInterface').to(verifyotp_usecase_1.VerifyOtpUsecase);
// CONTAINER-VERIFYOTP
// USECASE-OTP
/* ******************************************************************************************** */
// USECASE-REGISTER
// CONTAINER-VERIFYOTP
exports.registerUserContainer = new inversify_1.Container();
exports.registerUserContainer.bind('DataSource').toConstantValue(ormconfig_1.appDataSource);
exports.registerUserContainer.bind('UserDataModelEntityRepository').toDynamicValue((context) => context.container.get('DataSource').getRepository(user_datamodelentity_1.UserDataModelEntity));
exports.registerUserContainer.bind('RegisterUserPGDBDataHandlerInterface').to(register_datahandler_1.RegisterUserPGDBDataHandler);
exports.registerUserContainer.bind('RegisterUserRepositoryInterface').to(registeruser_repository_1.RegisterUserRepository);
exports.registerUserContainer.bind('RegisterUserUsecaseInterface').to(registeruser_usecase_1.RegisterUserUsecase);
// CONTAINER-VERIFYOTP
// USECASE-REGISTER
// MODULE-USERAUTHENTICATION
//# sourceMappingURL=inversify.config.js.map