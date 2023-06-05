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
require("reflect-metadata");
const PhoneInUseError_1 = require("@modules/userauthentication/domain/errors/PhoneInUseError");
const VerifyingOtpError_1 = require("@modules/userauthentication/domain/errors/VerifyingOtpError");
const IncorrectOtpError_1 = require("@modules/userauthentication/domain/errors/IncorrectOtpError");
const RegisterUserError_1 = require("@modules/userauthentication/domain/errors/RegisterUserError");
const SendingOtpError_1 = require("@modules/userauthentication/domain/errors/SendingOtpError");
const pgdatabaseaccess_error_1 = require("@modules/userauthentication/domain/errors/pgdatabaseaccess.error");
const twilioapi_error_1 = require("@modules/userauthentication/domain/errors/twilioapi.error");
const tokengeneration_error_1 = require("@modules/userauthentication/domain/errors/tokengeneration.error");
const tokeninvalid_error_1 = require("@modules/userauthentication/domain/errors/tokeninvalid.error");
const refreshtokeninvalid_error_1 = require("@modules/userauthentication/domain/errors/refreshtokeninvalid.error");
const refreshtokengeneration_error_1 = require("@modules/userauthentication/domain/errors/refreshtokengeneration.error");
let UserAuthenticationRepository = class UserAuthenticationRepository {
    constructor(twilioExternalAdapterInterface, jwtExternalAdapterInterface, userAuthenticationPGDBDataHandlerInterface) {
        this.twilioExternalAdapterInterface = twilioExternalAdapterInterface;
        this.jwtExternalAdapterInterface = jwtExternalAdapterInterface;
        this.userAuthenticationPGDBDataHandlerInterface = userAuthenticationPGDBDataHandlerInterface;
    }
    sendOtp(sendOtpData) {
        return __awaiter(this, void 0, void 0, function* () {
            const twilioExternalAdapterData = yield this.twilioExternalAdapterInterface
                .sendOtp(sendOtpData);
            if (twilioExternalAdapterData instanceof SendingOtpError_1.SendingOtpError) {
                return twilioExternalAdapterData;
            }
            if (twilioExternalAdapterData instanceof twilioapi_error_1.TwilioAPIError) {
                return new SendingOtpError_1.SendingOtpError();
            }
            if (twilioExternalAdapterData.success === true) {
                return { message: 'OTP has been sent successfully' };
            }
            return new SendingOtpError_1.SendingOtpError();
        });
    }
    verifyOtp(verifyOtpData) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyOtpResult = yield this.twilioExternalAdapterInterface.verifyOtp(verifyOtpData);
            if (verifyOtpResult instanceof IncorrectOtpError_1.IncorrectOtpError) {
                return verifyOtpResult;
            }
            if (verifyOtpResult instanceof twilioapi_error_1.TwilioAPIError) {
                return new VerifyingOtpError_1.VerifyingOtpError();
            }
            if (verifyOtpResult.success === true) {
                const checkUserExistResult = yield this.userAuthenticationPGDBDataHandlerInterface
                    .checkUserExist(verifyOtpData);
                if (checkUserExistResult instanceof pgdatabaseaccess_error_1.DatabaseAccessError) {
                    return new VerifyingOtpError_1.VerifyingOtpError();
                }
                if (checkUserExistResult.data.userAlreadyRegistered === true) {
                    const getUserUIDResult = yield this.userAuthenticationPGDBDataHandlerInterface
                        .getUserUID(verifyOtpData);
                    if (getUserUIDResult instanceof pgdatabaseaccess_error_1.DatabaseAccessError) {
                        return new VerifyingOtpError_1.VerifyingOtpError();
                    }
                    const generateTokenResult = yield this.jwtExternalAdapterInterface.generateToken({
                        USER_UID: getUserUIDResult.data.userUid,
                    });
                    if (generateTokenResult instanceof tokengeneration_error_1.TokenGenerationError) {
                        return new VerifyingOtpError_1.VerifyingOtpError();
                    }
                    const saveRefreshToken = yield this.userAuthenticationPGDBDataHandlerInterface
                        .saveRefreshToken({
                        USER_UID: getUserUIDResult.data.userUid,
                        USER_REFRESHTOKEN: generateTokenResult.data.refreshToken,
                    });
                    if (saveRefreshToken instanceof pgdatabaseaccess_error_1.DatabaseAccessError) {
                        return new VerifyingOtpError_1.VerifyingOtpError();
                    }
                    return {
                        message: 'OTP successfully verified',
                        data: {
                            userAlreadyRegistered: checkUserExistResult.data.userAlreadyRegistered,
                            token: generateTokenResult.data.token,
                            refreshToken: generateTokenResult.data.refreshToken,
                        },
                    };
                }
                return {
                    message: 'OTP successfully verified',
                    data: { userAlreadyRegistered: checkUserExistResult.data.userAlreadyRegistered },
                };
            }
            return new VerifyingOtpError_1.VerifyingOtpError();
        });
    }
    registerUser(registerUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUserData = yield this.userAuthenticationPGDBDataHandlerInterface
                .registerUser(registerUserData);
            if (newUserData instanceof PhoneInUseError_1.PhoneInUseError) {
                return newUserData;
            }
            if (newUserData instanceof pgdatabaseaccess_error_1.DatabaseAccessError) {
                return new RegisterUserError_1.RegisterUserError();
            }
            const generateTokenResult = yield this.jwtExternalAdapterInterface.generateToken({
                USER_UID: newUserData.data.userUid,
            });
            if (generateTokenResult instanceof tokengeneration_error_1.TokenGenerationError) {
                return new RegisterUserError_1.RegisterUserError();
            }
            const saveRefreshToken = yield this.userAuthenticationPGDBDataHandlerInterface
                .saveRefreshToken({
                USER_UID: newUserData.data.userUid,
                USER_REFRESHTOKEN: generateTokenResult.data.refreshToken,
            });
            if (saveRefreshToken instanceof pgdatabaseaccess_error_1.DatabaseAccessError) {
                return new RegisterUserError_1.RegisterUserError();
            }
            return {
                message: 'User registration successful',
                data: {
                    userFullname: newUserData.data.userFullname,
                    userEmail: newUserData.data.userEmail,
                    userPhone: newUserData.data.userPhone,
                    token: generateTokenResult.data.token,
                    refreshToken: generateTokenResult.data.refreshToken,
                },
            };
        });
    }
    authenticateUser(authenticateUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtExternalAdapterData = yield this.jwtExternalAdapterInterface
                .verifyToken({ token: authenticateUserData.token });
            if (jwtExternalAdapterData instanceof tokeninvalid_error_1.InvalidTokenError) {
                return new tokeninvalid_error_1.InvalidTokenError();
            }
            return { message: 'Access token verified and is valid', data: { uid: jwtExternalAdapterData.data.userUid } };
        });
    }
    refreshToken(refreshTokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.jwtExternalAdapterInterface
                .verifyToken({ token: refreshTokenData.USER_REFRESHTOKEN });
            if (payload instanceof tokeninvalid_error_1.InvalidTokenError) {
                return new refreshtokeninvalid_error_1.InvalidRefreshTokenError();
            }
            const refreshTokenFromDB = yield this.userAuthenticationPGDBDataHandlerInterface
                .getRefreshToken({ USER_UID: payload.data.userUid });
            if (refreshTokenFromDB instanceof pgdatabaseaccess_error_1.DatabaseAccessError) {
                return new refreshtokengeneration_error_1.RefreshTokenGenerationError();
            }
            if (refreshTokenData.USER_REFRESHTOKEN !== refreshTokenFromDB.data.refreshToken) {
                return new refreshtokeninvalid_error_1.InvalidRefreshTokenError();
            }
            const generateNewTokenResult = yield this.jwtExternalAdapterInterface.generateToken({
                USER_UID: payload.data.userUid,
            });
            if (generateNewTokenResult instanceof tokengeneration_error_1.TokenGenerationError) {
                return new refreshtokengeneration_error_1.RefreshTokenGenerationError();
            }
            const saveRefreshToken = yield this.userAuthenticationPGDBDataHandlerInterface
                .saveRefreshToken({
                USER_UID: payload.data.userUid,
                USER_REFRESHTOKEN: generateNewTokenResult.data.refreshToken,
            });
            if (saveRefreshToken instanceof pgdatabaseaccess_error_1.DatabaseAccessError) {
                return new refreshtokengeneration_error_1.RefreshTokenGenerationError();
            }
            return {
                message: 'Refresh Token updation successful',
                data: {
                    token: generateNewTokenResult.data.token,
                    refreshToken: generateNewTokenResult.data.refreshToken,
                },
            };
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