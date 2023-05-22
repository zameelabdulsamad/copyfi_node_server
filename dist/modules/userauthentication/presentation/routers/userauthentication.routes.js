"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authmiddleware_adapter_1 = require("@main/shared/adapters/authmiddleware.adapter");
const expressroute_adapter_1 = require("@main/shared/adapters/expressroute.adapter");
const sendotp_factory_1 = require("../factories/otp_factory/sendotp.factory");
const verifyotp_factory_1 = require("../factories/otp_factory/verifyotp.factory");
const registeruser_factory_1 = require("../factories/registeruser_factory/registeruser.factory");
function UserAuthenticationRoutes(router) {
    router.post('/userauthentication/sendotp', (0, expressroute_adapter_1.expressRouteAdapter)((0, sendotp_factory_1.sendOtpFactory)()));
    router.post('/userauthentication/verifyotp', (0, expressroute_adapter_1.expressRouteAdapter)((0, verifyotp_factory_1.verifyOtpFactory)()));
    router.post('/userauthentication/register', authmiddleware_adapter_1.authMiddleware, (0, expressroute_adapter_1.expressRouteAdapter)((0, registeruser_factory_1.registerUserFactory)()));
}
exports.default = UserAuthenticationRoutes;
//# sourceMappingURL=userauthentication.routes.js.map