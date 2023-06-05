"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenGenerationError = void 0;
class RefreshTokenGenerationError extends Error {
    constructor() {
        super('Error generating Refresh Token');
        this.name = 'TokenGenerationError';
    }
}
exports.RefreshTokenGenerationError = RefreshTokenGenerationError;
//# sourceMappingURL=refreshtokengeneration.error.js.map