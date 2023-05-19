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
let UserAuthenticationRepository = class UserAuthenticationRepository {
    constructor(verifyOtpTwilioAdapterInterface, sendOtpTwilioAdapterInterface, jwtExternalAdapterInterface, userAuthenticationPGDBDataHandlerInterface) {
        this.sendOtpTwilioAdapterInterface = sendOtpTwilioAdapterInterface;
        this.verifyOtpTwilioAdapterInterface = verifyOtpTwilioAdapterInterface;
        this.jwtExternalAdapterInterface = jwtExternalAdapterInterface;
        this.userAuthenticationPGDBDataHandlerInterface = userAuthenticationPGDBDataHandlerInterface;
    }
    sendOtp(sendOtpData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sendOtpTwilioAdapterInterface.sendOtp(sendOtpData);
        });
    }
    verifyOtp(verifyOtpData) {
        return __awaiter(this, void 0, void 0, function* () {
            const [verifyOtpResult, checkUserExistResult] = yield Promise.all([
                this.verifyOtpTwilioAdapterInterface.verifyOtp(verifyOtpData),
                this.userAuthenticationPGDBDataHandlerInterface.checkUserExist(verifyOtpData),
            ]);
            if (verifyOtpResult instanceof VerifyingOtpError_1.VerifyingOtpError) {
                return verifyOtpResult;
            }
            if (checkUserExistResult instanceof VerifyingOtpError_1.VerifyingOtpError) {
                return checkUserExistResult;
            }
            return {
                message: verifyOtpResult.message,
                userAlreadyRegisted: checkUserExistResult.userAlreadyRegisted,
            };
        });
    }
    registerUser(registerUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userAuthenticationPGDBDataHandlerInterface.registerUser(registerUserData);
        });
    }
    loginUser(loginUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const getUserUIDResult = yield this.userAuthenticationPGDBDataHandlerInterface
                .getUserUID(loginUserData);
            if (getUserUIDResult instanceof UnauthorizedError_1.UnauthorizedError) {
                return getUserUIDResult;
            }
            const generateTokenResult = yield this.jwtExternalAdapterInterface.generateToken(getUserUIDResult);
            if (generateTokenResult instanceof UnauthorizedError_1.UnauthorizedError) {
                return generateTokenResult;
            }
            return {
                message: 'User logged in',
                acctok: generateTokenResult.acctok,
            };
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
    __param(0, (0, inversify_1.inject)('VerifyOtpTwilioAdapterInterface')),
    __param(1, (0, inversify_1.inject)('SendOtpTwilioAdapterInterface')),
    __param(2, (0, inversify_1.inject)('JwtExternalAdapterInterface')),
    __param(3, (0, inversify_1.inject)('UserAuthenticationPGDBDataHandlerInterface')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], UserAuthenticationRepository);
exports.UserAuthenticationRepository = UserAuthenticationRepository;
//# sourceMappingURL=userauthentication.repository.js.map