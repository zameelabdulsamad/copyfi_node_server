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
exports.RefreshTokenController = void 0;
const basecontroller_1 = require("@main/shared/controllers/basecontroller");
const http_helper_1 = require("@main/shared/helpers/http_helper/http.helper");
const refreshtokengeneration_error_1 = require("@modules/userauthentication/domain/errors/refreshtokengeneration.error");
const refreshtokeninvalid_error_1 = require("@modules/userauthentication/domain/errors/refreshtokeninvalid.error");
class RefreshTokenController extends basecontroller_1.BaseController {
    constructor(refreshTokenValidation, refreshTokenUsecaseInterface) {
        super(refreshTokenValidation);
        this.refreshTokenValidation = refreshTokenValidation;
        this.refreshTokenUsecaseInterface = refreshTokenUsecaseInterface;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const { USER_REFRESHTOKEN } = httpRequest.body;
            const newTokenIssuedOrError = yield this.refreshTokenUsecaseInterface
                .execute({ USER_REFRESHTOKEN });
            if (newTokenIssuedOrError instanceof refreshtokengeneration_error_1.RefreshTokenGenerationError
                || newTokenIssuedOrError instanceof refreshtokeninvalid_error_1.InvalidRefreshTokenError) {
                return (0, http_helper_1.badRequest)(newTokenIssuedOrError);
            }
            return (0, http_helper_1.ok)({ message: newTokenIssuedOrError.message, data: newTokenIssuedOrError.data });
        });
    }
}
exports.RefreshTokenController = RefreshTokenController;
//# sourceMappingURL=refreshtoken.controller.js.map