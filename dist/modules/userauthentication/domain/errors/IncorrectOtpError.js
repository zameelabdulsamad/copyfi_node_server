"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncorrectOtpError = void 0;
class IncorrectOtpError extends Error {
    constructor() {
        super('Incorrect OTP provided');
        this.name = 'IncorrectOtpError';
    }
}
exports.IncorrectOtpError = IncorrectOtpError;
//# sourceMappingURL=IncorrectOtpError.js.map