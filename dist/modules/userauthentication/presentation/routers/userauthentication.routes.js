"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressroute_adapter_1 = require("@main/shared/adapters/expressroute.adapter");
const loginuser_factory_1 = require("../factories/loginuser_factory/loginuser.factory");
const sendotp_factory_1 = require("../factories/otp_factory/sendotp.factory");
const verifyotp_factory_1 = require("../factories/otp_factory/verifyotp.factory");
const registeruser_factory_1 = require("../factories/registeruser_factory/registeruser.factory");
function UserAuthenticationRoutes(router) {
    router.post('/userauthentication/sendotp', (0, expressroute_adapter_1.expressRouteAdapter)((0, sendotp_factory_1.sendOtpFactory)()));
    router.post('/userauthentication/verifyotp', (0, expressroute_adapter_1.expressRouteAdapter)((0, verifyotp_factory_1.verifyOtpFactory)()));
    router.post('/userauthentication/register', (0, expressroute_adapter_1.expressRouteAdapter)((0, registeruser_factory_1.registerUserFactory)()));
    router.post('/userauthentication/login', (0, expressroute_adapter_1.expressRouteAdapter)((0, loginuser_factory_1.loginUserFactory)()));
}
exports.default = UserAuthenticationRoutes;
//# sourceMappingURL=userauthentication.routes.js.map