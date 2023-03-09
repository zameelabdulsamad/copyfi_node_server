"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDb = void 0;
const console_1 = require("console");
const pg_1 = require("pg");
const env_1 = __importDefault(require("@main/config/env"));
const credentials = {
    user: env_1.default.postgresConfig.postgresDbUser,
    host: env_1.default.postgresConfig.postgresDbHost,
    database: env_1.default.postgresConfig.postgresDb,
    password: env_1.default.postgresConfig.postgresDbPassword,
    port: env_1.default.postgresConfig.postgresDbPort,
};
const pool = new pg_1.Pool(credentials);
const ConnectDb = () => {
    return new Promise((resolve, reject) => {
        pool.connect((err, client, _release) => {
            if (err) {
                (0, console_1.log)('Error acquiring client', err.stack);
                reject(err.stack);
            }
            (0, console_1.log)('Connected to', credentials.database);
            resolve(client);
        });
    });
};
exports.ConnectDb = ConnectDb;
//# sourceMappingURL=connection.js.map