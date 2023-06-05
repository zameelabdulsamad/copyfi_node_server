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
exports.UserAuthenticationPGDBDataHandler = void 0;
const pgdatabaseaccess_error_1 = require("@modules/userauthentication/domain/errors/pgdatabaseaccess.error");
const PhoneInUseError_1 = require("@modules/userauthentication/domain/errors/PhoneInUseError");
const inversify_1 = require("inversify");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
let UserAuthenticationPGDBDataHandler = class UserAuthenticationPGDBDataHandler {
    constructor(userDataModelEntity) {
        this.userDataModelEntity = userDataModelEntity;
    }
    checkUserExist(checkUserExistData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPhoneNumberAlreadyRegistered = (yield this.userDataModelEntity.createQueryBuilder('USERS')
                    .select('USERS.USER_UID')
                    .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: checkUserExistData.USER_PHONE })
                    .getCount()) > 0;
                if (isPhoneNumberAlreadyRegistered) {
                    return { data: { userAlreadyRegistered: true } };
                }
                return { data: { userAlreadyRegistered: false } };
            }
            catch (error) {
                if (error instanceof Error) {
                    return new pgdatabaseaccess_error_1.DatabaseAccessError(error.message);
                }
                return new pgdatabaseaccess_error_1.DatabaseAccessError('Unknown error occurred');
            }
        });
    }
    registerUser(registerUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPhoneNumberAlreadyRegistered = (yield this.userDataModelEntity.createQueryBuilder('USERS')
                    .select('USERS.USER_UID')
                    .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: registerUserData.USER_PHONE })
                    .getCount()) > 0;
                if (isPhoneNumberAlreadyRegistered) {
                    return new PhoneInUseError_1.PhoneInUseError();
                }
                const newUser = yield this.userDataModelEntity.save({
                    USER_EMAIL: registerUserData.USER_EMAIL,
                    USER_PHONE: registerUserData.USER_PHONE,
                    USER_FULLNAME: registerUserData.USER_FULLNAME,
                });
                return {
                    data: {
                        userEmail: newUser.USER_EMAIL,
                        userFullname: newUser.USER_FULLNAME,
                        userPhone: newUser.USER_PHONE,
                        userUid: newUser.USER_UID,
                    },
                };
            }
            catch (error) {
                if (error instanceof Error) {
                    return new pgdatabaseaccess_error_1.DatabaseAccessError(error.message);
                }
                return new pgdatabaseaccess_error_1.DatabaseAccessError('Unknown error occurred');
            }
        });
    }
    getUserUID(loginUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUID = (yield this.userDataModelEntity.createQueryBuilder('USERS')
                    .select('USERS.USER_UID')
                    .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: loginUserData.USER_PHONE })
                    .getOneOrFail());
                return { data: { userUid: userUID.USER_UID } };
            }
            catch (error) {
                if (error instanceof Error) {
                    return new pgdatabaseaccess_error_1.DatabaseAccessError(error.message);
                }
                return new pgdatabaseaccess_error_1.DatabaseAccessError('Unknown error occurred');
            }
        });
    }
    saveRefreshToken(saveRefreshTokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userUID = saveRefreshTokenData.USER_UID;
                const refreshToken = saveRefreshTokenData.USER_REFRESHTOKEN;
                yield this.userDataModelEntity.createQueryBuilder()
                    .update()
                    .set({ USER_REFRESHTOKEN: refreshToken })
                    .where('USER_UID = :USER_UID', { USER_UID: userUID })
                    .execute();
                return { success: true };
            }
            catch (error) {
                if (error instanceof Error) {
                    return new pgdatabaseaccess_error_1.DatabaseAccessError(error.message);
                }
                return new pgdatabaseaccess_error_1.DatabaseAccessError('Unknown error occurred');
            }
        });
    }
    getRefreshToken(getRefreshTokenData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = (yield this.userDataModelEntity.createQueryBuilder('USERS')
                    .select('USERS.USER_REFRESHTOKEN')
                    .where('USERS.USER_UID = :USER_UID', { USER_UID: getRefreshTokenData.USER_UID })
                    .getOneOrFail());
                return { data: { refreshToken: refreshToken.USER_REFRESHTOKEN } };
            }
            catch (error) {
                if (error instanceof Error) {
                    return new pgdatabaseaccess_error_1.DatabaseAccessError(error.message);
                }
                return new pgdatabaseaccess_error_1.DatabaseAccessError('Unknown error occurred');
            }
        });
    }
};
UserAuthenticationPGDBDataHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('UserDataModelEntityRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserAuthenticationPGDBDataHandler);
exports.UserAuthenticationPGDBDataHandler = UserAuthenticationPGDBDataHandler;
//# sourceMappingURL=userauthentication.datahandler.js.map