"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioAPIError = void 0;
class TwilioAPIError extends Error {
    constructor(originalErrorMessage) {
        super(`An error occurred while interacting with the Twilio API: ${originalErrorMessage}`);
        this.name = 'TwilioAPIError';
    }
}
exports.TwilioAPIError = TwilioAPIError;
//# sourceMappingURL=twilioapi.error.js.map