"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthenticationRepository = void 0;
const inversify_1 = require("inversify");
const VerifyingOtpError_1 = require("@modules/userauthentication/domain/errors/otp_error/VerifyingOtpError");
const UnauthorizedError_1 = require("@modules/userauthentication/domain/errors/login_error/UnauthorizedError");
require("reflect-metadata");
const IncorrectOtpError_1 = require("@modules/userauthentication/domain/errors/otp_error/IncorrectOtpError");
const PhoneInUseError_1 = require("@modules/userauthentication/domain/errors/register_error/PhoneInUseError");
const RegisterUserError_1 = require("@modules/userauthentication/domain/errors/register_error/RegisterUserError");
let UserAuthenticationRepository = class UserAuthenticationRepository {
    constructor(twilioExternalAdapterInterface, jwtExternalAdapterInterface, userAuthenticationPGDBDataHandlerInterface) {
        this.twilioExternalAdapterInterface = twilioExternalAdapterInterface;
        this.jwtExternalAdapterInterface = jwtExternalAdapterInterface;
        this.userAuthenticationPGDBDataHandlerInterface = userAuthenticationPGDBDataHandlerInterface;
    }
    sendOtp(sendOtpData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.twilioExternalAdapterInterface.sendOtp(sendOtpData);
        });
    }
    verifyOtp(verifyOtpData) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyOtpResult = yield this.twilioExternalAdapterInterface.verifyOtp(verifyOtpData);
            if (verifyOtpResult instanceof IncorrectOtpError_1.IncorrectOtpError) {
                return verifyOtpResult;
            }
            if (verifyOtpResult instanceof VerifyingOtpError_1.VerifyingOtpError) {
                return verifyOtpResult;
            }
            const checkUserExistResult = yield this.userAuthenticationPGDBDataHandlerInterface
                .checkUserExist(verifyOtpData);
            if (checkUserExistResult instanceof VerifyingOtpError_1.VerifyingOtpError) {
                return checkUserExistResult;
            }
            if (checkUserExistResult.data.userAlreadyRegisted === true) {
                const getUserUIDResult = yield this.userAuthenticationPGDBDataHandlerInterface
                    .getUserUID(verifyOtpData);
                if (getUserUIDResult instanceof UnauthorizedError_1.UnauthorizedError) {
                    return getUserUIDResult;
                }
                const generateTokenResult = yield this.jwtExternalAdapterInterface.generateToken(getUserUIDResult);
                if (generateTokenResult instanceof UnauthorizedError_1.UnauthorizedError) {
                    return generateTokenResult;
                }
                const newcheckUserExistResult = Object.assign(Object.assign({}, checkUserExistResult.data), { TOKEN: generateTokenResult });
                return {
                    message: verifyOtpResult.message,
                    data: newcheckUserExistResult,
                };
            }
            return {
                message: verifyOtpResult.message,
                data: checkUserExistResult.data,
            };
        });
    }
    registerUser(registerUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUserData = yield this.userAuthenticationPGDBDataHandlerInterface
                .registerUser(registerUserData);
            if (newUserData instanceof PhoneInUseError_1.PhoneInUseError || newUserData instanceof RegisterUserError_1.RegisterUserError) {
                return newUserData;
            }
            const generateTokenResult = yield this.jwtExternalAdapterInterface.generateToken(newUserData.data);
            if (generateTokenResult instanceof UnauthorizedError_1.UnauthorizedError) {
                return generateTokenResult;
            }
            const newUserDataWithToken = Object.assign(Object.assign({}, newUserData.data), { TOKEN: generateTokenResult });
            return { message: 'User registration successful', data: newUserDataWithToken };
        });
    }
    authenticateUser(authenticateUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.jwtExternalAdapterInterface.verifyToken(authenticateUserData);
        });
    }
};
UserAuthenticationRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('TwilioExternalAdapterInterface')),
    __param(1, (0, inversify_1.inject)('JwtExternalAdapterInterface')),
    __param(2, (0, inversify_1.inject)('UserAuthenticationPGDBDataHandlerInterface')),
    __metadata("design:paramtypes", [Object, Object, Object])
], UserAuthenticationRepository);
exports.UserAuthenticationRepository = UserAuthenticationRepository;
//# sourceMappingURL=userauthentication.repository.js.map