"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidRefreshTokenError = void 0;
class InvalidRefreshTokenError extends Error {
    constructor() {
        super('Invalid or expired Refresh Token');
        this.name = 'InvalidRefreshTokenError';
    }
}
exports.InvalidRefreshTokenError = InvalidRefreshTokenError;
//# sourceMappingURL=refreshtokeninvalid.error.js.map