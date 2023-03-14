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
exports.SendOtpController = void 0;
const basecontroller_1 = require("@main/shared/controllers/basecontroller");
const http_helper_1 = require("@main/shared/helpers/http_helper/http.helper");
class SendOtpController extends basecontroller_1.BaseController {
    constructor(sendOtpValidation, sendOtpUsecaseInterface) {
        super(sendOtpValidation);
        this.sendOtpValidation = sendOtpValidation;
        this.sendOtpUsecaseInterface = sendOtpUsecaseInterface;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { USER_PHONE } = httpRequest.body;
            yield this.sendOtpUsecaseInterface.execute({ USER_PHONE });
            return (0, http_helper_1.ok)({
                authenticationToken: 'otpSent',
            });
        });
    }
}
exports.SendOtpController = SendOtpController;
//# sourceMappingURL=sentotp.controller.js.map