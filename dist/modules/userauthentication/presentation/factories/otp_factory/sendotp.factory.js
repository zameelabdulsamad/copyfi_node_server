"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOtpFactory = void 0;
const inversify_config_1 = require("@main/di/inversify.config");
const RequiredFieldValidation_1 = require("@main/shared/validations/RequiredFieldValidation");
const ValidationComposite_1 = require("@main/shared/validations/ValidationComposite");
const sentotp_controller_1 = require("../../controllers/otp_controller/sentotp.controller");
const sendOtpFactory = () => {
    const validation = new ValidationComposite_1.ValidationComposite([
        new RequiredFieldValidation_1.RequiredFieldValidation('USER_PHONE'),
    ], 'body');
    const useCase = inversify_config_1.sendOtpContainer.get('SendOtpUsecaseInterface');
    return new sentotp_controller_1.SendOtpController(validation, useCase);
};
exports.sendOtpFactory = sendOtpFactory;
//# sourceMappingURL=sendotp.factory.js.map