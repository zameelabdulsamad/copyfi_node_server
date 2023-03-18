"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneInUseError = void 0;
class PhoneInUseError extends Error {
    constructor() {
        super('Phone Number is already in use');
        this.name = 'PhoneInUseError';
    }
}
exports.PhoneInUseError = PhoneInUseError;
//# sourceMappingURL=PhoneInUseError.js.map