"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpContainer = void 0;
const sendotp_usecase_1 = require("@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase");
const sendotp_twilioadapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter");
const sendotp_repository_1 = require("@modules/userauthentication/infrastructure/repositories/otp_repository/sendotp.repository");
const inversify_1 = require("inversify");
exports.sendOtpContainer = new inversify_1.Container();
exports.sendOtpContainer.bind('SendOtpTwilioAdapterInterface').to(sendotp_twilioadapter_1.SendOtpTwilioAdapter);
exports.sendOtpContainer.bind('SendOtpRepositoryInterface').to(sendotp_repository_1.SendOtpRepository);
exports.sendOtpContainer.bind('SendOtpUsecaseInterface').to(sendotp_usecase_1.SendOtpUsecase);
//# sourceMappingURL=inversify.config.js.map