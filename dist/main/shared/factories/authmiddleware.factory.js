"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewareFactory = void 0;
const inversify_config_1 = require("@main/di/inversify.config");
const authmiddleware_1 = require("../authentication/authmiddleware");
const authMiddlewareFactory = () => {
    const authenticateUseCase = inversify_config_1.sl.get('AuthenticateUserUsecaseInterface');
    return new authmiddleware_1.AuthMiddleware(authenticateUseCase);
};
exports.authMiddlewareFactory = authMiddlewareFactory;
//# sourceMappingURL=authmiddleware.factory.js.map