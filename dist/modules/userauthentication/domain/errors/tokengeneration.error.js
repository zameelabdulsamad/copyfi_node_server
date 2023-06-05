"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGenerationError = void 0;
class TokenGenerationError extends Error {
    constructor() {
        super('Error generating token');
        this.name = 'TokenGenerationError';
    }
}
exports.TokenGenerationError = TokenGenerationError;
//# sourceMappingURL=tokengeneration.error.js.map