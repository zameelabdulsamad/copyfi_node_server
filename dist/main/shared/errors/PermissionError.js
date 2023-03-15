"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionError = void 0;
class PermissionError extends Error {
    constructor() {
        super('Permission denied');
        this.name = 'PermissionError';
    }
}
exports.PermissionError = PermissionError;
//# sourceMappingURL=PermissionError.js.map