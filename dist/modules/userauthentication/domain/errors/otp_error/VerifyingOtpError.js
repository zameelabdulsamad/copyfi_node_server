"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyingOtpError = void 0;
class VerifyingOtpError extends Error {
    constructor() {
        super('Error verifying OTP');
        this.name = 'VerifyingOtpError';
    }
}
exports.VerifyingOtpError = VerifyingOtpError;
//# sourceMappingURL=VerifyingOtpError.js.map