"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDb = void 0;
const console_1 = require("console");
const ormconfig_1 = require("./ormconfig");
const ConnectDb = () => {
    return new Promise((resolve, reject) => {
        ormconfig_1.appDataSource.initialize()
            .then(() => {
            (0, console_1.log)('Connected to postgresDB', ormconfig_1.appDataSource.options.database);
            resolve();
        })
            .catch((error) => {
            (0, console_1.log)('Error acquiring client', error);
            reject(error);
        });
    });
};
exports.ConnectDb = ConnectDb;
//# sourceMappingURL=connection.js.map