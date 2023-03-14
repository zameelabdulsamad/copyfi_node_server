"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendotp_usecase_1 = require("@modules/userauthentication/domain/usecases/otp_usecase/sendotp.usecase");
const sendotp_twilioadapter_1 = require("@modules/userauthentication/infrastructure/externaladapters/otp_externaladapter/twilio/sendotp.twilioadapter");
const sendotp_repository_1 = require("@modules/userauthentication/infrastructure/repositories/otp_repository/sendotp.repository");
const userauthentication_routes_1 = __importDefault(require("@modules/userauthentication/presentation/routers/userauthentication.routes"));
const express_1 = require("express");
function SetupRoutes(app) {
    const router = (0, express_1.Router)();
    app.use('/api', router);
    (0, userauthentication_routes_1.default)(router, new sendotp_usecase_1.SendOtpUsecase(new sendotp_repository_1.SendOtpRepository(new sendotp_twilioadapter_1.SendOtpTwilioAdapter())));
}
exports.default = SetupRoutes;
//# sourceMappingURL=routes.js.map