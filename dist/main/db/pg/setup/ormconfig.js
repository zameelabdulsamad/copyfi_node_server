"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const env_1 = __importDefault(require("@main/config/env"));
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const user_datamodelentity_1 = require("../datamodelentities/user.datamodelentity");
exports.appDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    username: env_1.default.postgresConfig.postgresDbUser,
    host: env_1.default.postgresConfig.postgresDbHost,
    database: env_1.default.postgresConfig.postgresDb,
    password: env_1.default.postgresConfig.postgresDbPassword,
    port: 5432,
    entities: [user_datamodelentity_1.UserDataModelEntity],
    synchronize: true,
    dropSchema: false,
    migrationsRun: true,
    logging: false,
    logger: 'debug',
    migrations: [(0, path_1.join)(__dirname, 'src/migration/**/*.ts')],
});
//# sourceMappingURL=ormconfig.js.map