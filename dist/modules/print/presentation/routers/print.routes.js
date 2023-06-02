"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authmiddleware_adapter_1 = require("@main/shared/adapters/authmiddleware.adapter");
const expressroute_adapter_1 = require("@main/shared/adapters/expressroute.adapter");
const newprintjob_factory_1 = require("../factories/newprintjob.factory");
const fileupload_middleware_1 = require("../middleware/fileupload.middleware");
function PrintRoutes(router) {
    router.post('/print/newprintjob', authmiddleware_adapter_1.authMiddleware, fileupload_middleware_1.fileUpload, (0, expressroute_adapter_1.expressRouteAdapter)((0, newprintjob_factory_1.newPrintJobFactory)()));
}
exports.default = PrintRoutes;
//# sourceMappingURL=print.routes.js.map