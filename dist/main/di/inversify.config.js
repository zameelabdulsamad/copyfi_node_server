"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpContainer = exports.sendOtpContainer = void 0;
const sendotp_usecase_1 = require("@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase");
const verifyotp_usecase_1 = require("@modules/userauthentication/domain/usecases/otp_usecase/verifyotp.usecase");
const sendotp_twilioadapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter");
const verifyotp_twilioadapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/verifyotp.twilioadapter");
const sendotp_repository_1 = require("@modules/userauthentication/infrastructure/repositories/otp_repository/sendotp.repository");
const verifyotp_repository_1 = require("@modules/userauthentication/infrastructure/repositories/otp_repository/verifyotp.repository");
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
exports.verifyOtpContainer.bind('VerifyOtpTwilioAdapterInterface').to(verifyotp_twilioadapter_1.VerifyOtpTwilioAdapter);
exports.verifyOtpContainer.bind('VerifyOtpRepositoryInterface').to(verifyotp_repository_1.VerifyOtpRepository);
exports.verifyOtpContainer.bind('VerifyOtpUsecaseInterface').to(verifyotp_usecase_1.VerifyOtpUsecase);
// CONTAINER-VERIFYOTP
// USECASE-OTP
// MODULE-USERAUTHENTICATION
//# sourceMappingURL=inversify.config.js.map