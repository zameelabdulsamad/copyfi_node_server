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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOtpTwilioAdapter = void 0;
const env_1 = __importDefault(require("@main/config/env"));
const twilio_1 = require("twilio");
class SendOtpTwilioAdapter {
    constructor() {
        this.credentials = {
            accountSid: env_1.default.twilioConfig.twilioAccountSid,
            authToken: env_1.default.twilioConfig.twilioAuthToken,
            serviceSid: env_1.default.twilioConfig.twilioServiceSid,
        };
    }
    sendOtp(userPhone) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new twilio_1.Twilio(this.credentials.accountSid, this.credentials.authToken);
            client.verify.v2.services(this.credentials.serviceSid).verifications.create({
                to: `${userPhone.USER_PHONE}`,
                channel: 'sms',
            });
            return 'OTP SENT';
        });
    }
}
exports.SendOtpTwilioAdapter = SendOtpTwilioAdapter;
//# sourceMappingURL=sendotp.twilioadapter.js.map