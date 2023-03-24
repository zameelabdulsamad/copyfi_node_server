"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserFactory = void 0;
const inversify_config_1 = require("@main/di/inversify.config");
const RequiredFieldValidation_1 = require("@main/shared/validations/RequiredFieldValidation");
const ValidationComposite_1 = require("@main/shared/validations/ValidationComposite");
const loginuser_controller_1 = require("../../controllers/loginuser_controller/loginuser.controller");
const loginUserFactory = () => {
    const validation = new ValidationComposite_1.ValidationComposite([
        new RequiredFieldValidation_1.RequiredFieldValidation('USER_PHONE'),
    ], 'body');
    const useCase = inversify_config_1.loginUserContainer.get('LoginUserUsecaseInterface');
    return new loginuser_controller_1.LoginUserController(validation, useCase);
};
exports.loginUserFactory = loginUserFactory;
//# sourceMappingURL=loginuser.factory.js.map