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
const PhoneInUseError_1 = require("@modules/userauthentication/domain/errors/PhoneInUseError");
const RegisterUserError_1 = require("@modules/userauthentication/domain/errors/RegisterUserError");
const UnauthorizedError_1 = require("@modules/userauthentication/domain/errors/UnauthorizedError");
const VerifyingOtpError_1 = require("@modules/userauthentication/domain/errors/VerifyingOtpError");
const inversify_1 = require("inversify");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
let UserAuthenticationPGDBDataHandler = class UserAuthenticationPGDBDataHandler {
    constructor(userDataModelEntity) {
        this.userDataModelEntity = userDataModelEntity;
    }
    checkUserExist(verifyOtpData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isPhoneNumberAlreadyRegistered = (yield this.userDataModelEntity.createQueryBuilder('USERS')
                    .select('USERS.USER_UID')
                    .where('USERS.USER_PHONE = :USER_PHONE', { USER_PHONE: verifyOtpData.USER_PHONE })
                    .getCount()) > 0;
                if (isPhoneNumberAlreadyRegistered) {
                    return { data: { userAlreadyRegistered: true } };
                }
                return { data: { userAlreadyRegistered: false } };
            }
            catch (error) {
                return new VerifyingOtpError_1.VerifyingOtpError();
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
                return { data: newUser };
            }
            catch (error) {
                return new RegisterUserError_1.RegisterUserError();
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
                return userUID;
            }
            catch (error) {
                return new UnauthorizedError_1.UnauthorizedError();
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