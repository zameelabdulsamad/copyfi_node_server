"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyOtpController = void 0;
const basecontroller_1 = require("@main/shared/controllers/basecontroller");
const http_helper_1 = require("@main/shared/helpers/http_helper/http.helper");
const VerifyingOtpError_1 = require("@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError");
class VerifyOtpController extends basecontroller_1.BaseController {
    constructor(verifyOtpValidation, verifyOtpUsecaseInterface) {
        super(verifyOtpValidation);
        this.verifyOtpValidation = verifyOtpValidation;
        this.verifyOtpUsecaseInterface = verifyOtpUsecaseInterface;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { USER_PHONE, otp } = httpRequest.body;
            const otpVerifiedOrError = yield this.verifyOtpUsecaseInterface.execute({ USER_PHONE, otp });
            if (otpVerifiedOrError instanceof VerifyingOtpError_1.VerifyingOtpError) {
                return (0, http_helper_1.badRequest)(otpVerifiedOrError);
            }
            return (0, http_helper_1.ok)(otpVerifiedOrError);
        });
    }
}
exports.VerifyOtpController = VerifyOtpController;
//# sourceMappingURL=verifyotp.controller.js.map