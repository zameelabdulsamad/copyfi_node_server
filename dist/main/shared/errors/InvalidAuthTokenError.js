"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidAuthTokenError = void 0;
class InvalidAuthTokenError extends Error {
    constructor() {
        super('Invalid authentication token');
        this.name = 'InvalidAuthTokenError';
    }
}
exports.InvalidAuthTokenError = InvalidAuthTokenError;
//# sourceMappingURL=InvalidAuthTokenError.js.map