"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userauthentication_routes_1 = __importDefault(require("@modules/userauthentication/presentation/routers/userauthentication.routes"));
const express_1 = require("express");
function SetupRoutes(app) {
    const router = (0, express_1.Router)();
    app.use('/api', router);
    (0, userauthentication_routes_1.default)(router);
}
exports.default = SetupRoutes;
//# sourceMappingURL=routes.js.map