"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressroute_adapter_1 = require("@main/shared/adapters/expressroute.adapter");
const sendotp_factory_1 = require("../factories/otp_factory/sendotp.factory");
function UserAuthenticationRoutes(router) {
    router.post('/userauthentication/sendotp', (0, expressroute_adapter_1.expressRouteAdapter)((0, sendotp_factory_1.sendOtpFactory)()));
}
exports.default = UserAuthenticationRoutes;
//# sourceMappingURL=userauthentication.routes.js.map