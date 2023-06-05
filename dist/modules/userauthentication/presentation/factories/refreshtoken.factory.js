"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenFactory = void 0;
const inversify_config_1 = require("@main/di/inversify.config");
const RequiredFieldValidation_1 = require("@main/shared/validations/RequiredFieldValidation");
const ValidationComposite_1 = require("@main/shared/validations/ValidationComposite");
const refreshtoken_controller_1 = require("../controllers/refreshtoken.controller");
const refreshTokenFactory = () => {
    const validation = new ValidationComposite_1.ValidationComposite([
        new RequiredFieldValidation_1.RequiredFieldValidation('USER_REFRESHTOKEN'),
    ], 'body');
    const useCase = inversify_config_1.sl.get('RefreshTokenUsecaseInterface');
    return new refreshtoken_controller_1.RefreshTokenController(validation, useCase);
};
exports.refreshTokenFactory = refreshTokenFactory;
//# sourceMappingURL=refreshtoken.factory.js.map