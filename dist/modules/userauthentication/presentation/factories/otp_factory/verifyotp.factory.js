"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtpFactory = void 0;
const inversify_config_1 = require("@main/di/inversify.config");
const RequiredFieldValidation_1 = require("@main/shared/validations/RequiredFieldValidation");
const ValidationComposite_1 = require("@main/shared/validations/ValidationComposite");
const verifyotp_controller_1 = require("../../controllers/otp_controller/verifyotp.controller");
const verifyOtpFactory = () => {
    const validation = new ValidationComposite_1.ValidationComposite([
        new RequiredFieldValidation_1.RequiredFieldValidation('otp'),
        new RequiredFieldValidation_1.RequiredFieldValidation('USER_PHONE'),
    ], 'body');
    const useCase = inversify_config_1.sl.get('VerifyOtpUsecaseInterface');
    return new verifyotp_controller_1.VerifyOtpController(validation, useCase);
};
exports.verifyOtpFactory = verifyOtpFactory;
//# sourceMappingURL=verifyotp.factory.js.map