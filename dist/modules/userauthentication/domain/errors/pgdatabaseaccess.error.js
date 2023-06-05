"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAccessError = void 0;
class DatabaseAccessError extends Error {
    constructor(originalErrorMessage) {
        super('Error accessing the database');
        super(`An error occurred while accessing the PGdatabase: ${originalErrorMessage}`);
        this.name = 'DatabaseAccessError';
    }
}
exports.DatabaseAccessError = DatabaseAccessError;
//# sourceMappingURL=pgdatabaseaccess.error.js.map