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
exports.RegisterUserController = void 0;
const basecontroller_1 = require("@main/shared/controllers/basecontroller");
const http_helper_1 = require("@main/shared/helpers/http_helper/http.helper");
const PhoneInUseError_1 = require("@modules/userauthentication/domain/errors/register_error/PhoneInUseError");
const RegisterUserError_1 = require("@modules/userauthentication/domain/errors/register_error/RegisterUserError");
class RegisterUserController extends basecontroller_1.BaseController {
    constructor(registerUserValidation, registerUserUsecaseInterface) {
        super(registerUserValidation);
        this.registerUserValidation = registerUserValidation;
        this.registerUserUsecaseInterface = registerUserUsecaseInterface;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { USER_PHONE, USER_EMAIL, USER_FULLNAME } = httpRequest.body;
            const userRegisteredOrError = yield this.registerUserUsecaseInterface.execute({
                USER_PHONE,
                USER_EMAIL,
                USER_FULLNAME,
            });
            if (userRegisteredOrError instanceof PhoneInUseError_1.PhoneInUseError
                || userRegisteredOrError instanceof RegisterUserError_1.RegisterUserError) {
                return (0, http_helper_1.badRequest)(userRegisteredOrError);
            }
            return (0, http_helper_1.ok)(userRegisteredOrError.message, userRegisteredOrError.data);
        });
    }
}
exports.RegisterUserController = RegisterUserController;
//# sourceMappingURL=registeruser.controller.js.map