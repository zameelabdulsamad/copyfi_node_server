"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.TwilioExternalAdapter = void 0;
const env_1 = __importDefault(require("@main/config/env"));
const inversify_1 = require("inversify");
const twilio_1 = require("twilio");
require("reflect-metadata");
const IncorrectOtpError_1 = require("@modules/userauthentication/domain/errors/IncorrectOtpError");
const SendingOtpError_1 = require("@modules/userauthentication/domain/errors/SendingOtpError");
const twilioapi_error_1 = require("@modules/userauthentication/domain/errors/twilioapi.error");
let TwilioExternalAdapter = class TwilioExternalAdapter {
    constructor() {
        this.credentials = {
            accountSid: env_1.default.twilioConfig.twilioAccountSid,
            authToken: env_1.default.twilioConfig.twilioAuthToken,
            serviceSid: env_1.default.twilioConfig.twilioServiceSid,
        };
    }
    sendOtp(sendOtpData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new twilio_1.Twilio(this.credentials.accountSid, this.credentials.authToken);
                const verification = yield client.verify.v2.services(this.credentials.serviceSid).verifications.create({
                    to: `${sendOtpData.USER_PHONE}`,
                    channel: 'sms',
                });
                if (verification.status === 'pending') {
                    return { success: true };
                }
                return new SendingOtpError_1.SendingOtpError();
            }
            catch (error) {
                if (error instanceof Error) {
                    return new twilioapi_error_1.TwilioAPIError(error.message);
                }
                return new twilioapi_error_1.TwilioAPIError('Unknown error occurred');
            }
        });
    }
    verifyOtp(verifyOtpData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = new twilio_1.Twilio(this.credentials.accountSid, this.credentials.authToken);
                const verifiedResponse = yield client.verify.v2.services(this.credentials.serviceSid).verificationChecks.create({
                    to: `${verifyOtpData.USER_PHONE}`,
                    code: `${verifyOtpData.otp}`,
                });
                if (verifiedResponse.status === 'approved') {
                    return { success: true };
                }
                return new IncorrectOtpError_1.IncorrectOtpError();
            }
            catch (error) {
                if (error instanceof Error) {
                    return new twilioapi_error_1.TwilioAPIError(error.message);
                }
                return new twilioapi_error_1.TwilioAPIError('Unknown error occurred');
            }
        });
    }
};
TwilioExternalAdapter = __decorate([
    (0, inversify_1.injectable)()
], TwilioExternalAdapter);
exports.TwilioExternalAdapter = TwilioExternalAdapter;
//# sourceMappingURL=twilio.externaladapter.js.map