"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUserFactory = void 0;
const inversify_config_1 = require("@main/di/inversify.config");
const RequiredFieldValidation_1 = require("@main/shared/validations/RequiredFieldValidation");
const ValidationComposite_1 = require("@main/shared/validations/ValidationComposite");
const registeruser_controller_1 = require("../../controllers/registeruser_controller/registeruser.controller");
const registerUserFactory = () => {
    const validation = new ValidationComposite_1.ValidationComposite([
        new RequiredFieldValidation_1.RequiredFieldValidation('USER_FULLNAME'),
        new RequiredFieldValidation_1.RequiredFieldValidation('USER_PHONE'),
        new RequiredFieldValidation_1.RequiredFieldValidation('USER_EMAIL'),
    ], 'body');
    const useCase = inversify_config_1.sl.get('RegisterUserUsecaseInterface');
    return new registeruser_controller_1.RegisterUserController(validation, useCase);
};
exports.registerUserFactory = registerUserFactory;
//# sourceMappingURL=registeruser.factory.js.map