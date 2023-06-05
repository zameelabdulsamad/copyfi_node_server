"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTokenError = void 0;
class InvalidTokenError extends Error {
    constructor() {
        super('Invalid or expired token');
        this.name = 'InvalidTokenError';
    }
}
exports.InvalidTokenError = InvalidTokenError;
//# sourceMappingURL=tokeninvalid.error.js.map