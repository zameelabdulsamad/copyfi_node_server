"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserError = void 0;
class RegisterUserError extends Error {
    constructor() {
        super('Error registering user');
        this.name = 'RegisterUserError';
    }
}
exports.RegisterUserError = RegisterUserError;
//# sourceMappingURL=RegisterUserError.js.map