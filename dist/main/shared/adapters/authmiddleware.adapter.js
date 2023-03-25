"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authmiddleware_factory_1 = require("../factories/authmiddleware.factory");
const expressmiddleware_adapter_1 = require("./expressmiddleware.adapter");
exports.authMiddleware = (0, expressmiddleware_adapter_1.expressMiddlewareAdapter)((0, authmiddleware_factory_1.authMiddlewareFactory)());
//# sourceMappingURL=authmiddleware.adapter.js.map