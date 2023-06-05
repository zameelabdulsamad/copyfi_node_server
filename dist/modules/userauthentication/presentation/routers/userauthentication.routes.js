"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressroute_adapter_1 = require("@main/shared/adapters/expressroute.adapter");
const sendotp_factory_1 = require("../factories/sendotp.factory");
const verifyotp_factory_1 = require("../factories/verifyotp.factory");
const registeruser_factory_1 = require("../factories/registeruser.factory");
const refreshtoken_factory_1 = require("../factories/refreshtoken.factory");
function UserAuthenticationRoutes(router) {
    router.post('/userauthentication/sendotp', (0, expressroute_adapter_1.expressRouteAdapter)((0, sendotp_factory_1.sendOtpFactory)()));
    router.post('/userauthentication/verifyotp', (0, expressroute_adapter_1.expressRouteAdapter)((0, verifyotp_factory_1.verifyOtpFactory)()));
    router.post('/userauthentication/register', (0, expressroute_adapter_1.expressRouteAdapter)((0, registeruser_factory_1.registerUserFactory)()));
    router.post('/userauthentication/refreshtoken', (0, expressroute_adapter_1.expressRouteAdapter)((0, refreshtoken_factory_1.refreshTokenFactory)()));
}
exports.default = UserAuthenticationRoutes;
//# sourceMappingURL=userauthentication.routes.js.map