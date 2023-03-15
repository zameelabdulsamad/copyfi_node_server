"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendingOtpError = void 0;
class SendingOtpError extends Error {
    constructor() {
        super('Error sending OTP');
        this.name = 'SendingOtpError';
    }
}
exports.SendingOtpError = SendingOtpError;
//# sourceMappingURL=SendingOtpError.js.map