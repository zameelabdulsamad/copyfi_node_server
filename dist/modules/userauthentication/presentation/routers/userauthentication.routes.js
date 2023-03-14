"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_config_1 = require("@main/di/inversify.config");
const expressroute_adapter_1 = require("@main/shared/adapters/expressroute.adapter");
const ValidationComposite_1 = require("@main/shared/validations/ValidationComposite");
const RequiredFieldValidation_1 = require("@main/shared/validations/RequiredFieldValidation");
const sentotp_controller_1 = require("../controllers/otp_controller/sentotp.controller");
function UserAuthenticationRoutes(router) {
    router.post('/userauthentication/sendotp', (0, expressroute_adapter_1.expressRouteAdapter)(new sentotp_controller_1.SendOtpController(new ValidationComposite_1.ValidationComposite([
        new RequiredFieldValidation_1.RequiredFieldValidation('USER_PHONE'),
    ], 'body'), inversify_config_1.sendOtpContainer.get('SendOtpUsecaseInterface'))));
}
exports.default = UserAuthenticationRoutes;
//# sourceMappingURL=userauthentication.routes.js.map