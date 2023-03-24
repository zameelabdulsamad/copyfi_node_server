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
exports.LoginUserController = void 0;
const basecontroller_1 = require("@main/shared/controllers/basecontroller");
const http_helper_1 = require("@main/shared/helpers/http_helper/http.helper");
const UnauthorizedError_1 = require("@modules/userauthentication/domain/errors/login_error/UnauthorizedError");
class LoginUserController extends basecontroller_1.BaseController {
    constructor(loginUserValidation, loginUserUsecaseInterface) {
        super(loginUserValidation);
        this.loginUserValidation = loginUserValidation;
        this.loginUserUsecaseInterface = loginUserUsecaseInterface;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { USER_PHONE } = httpRequest.body;
            const userLoggedInOrError = yield this.loginUserUsecaseInterface.execute({
                USER_PHONE,
            });
            if (userLoggedInOrError instanceof UnauthorizedError_1.UnauthorizedError) {
                return (0, http_helper_1.badRequest)(userLoggedInOrError);
            }
            return (0, http_helper_1.ok)(userLoggedInOrError);
        });
    }
}
exports.LoginUserController = LoginUserController;
//# sourceMappingURL=loginuser.controller.js.map