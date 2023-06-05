"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAccessError = void 0;
class DatabaseAccessError extends Error {
    constructor() {
        super('Error accessing the database');
        this.name = 'DatabaseAccessError';
    }
}
exports.DatabaseAccessError = DatabaseAccessError;
//# sourceMappingURL=CheckUserExistError.js.map