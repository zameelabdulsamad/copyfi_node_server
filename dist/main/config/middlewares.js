"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyparser_1 = require("@main/middlewares/bodyparser");
const contenttype_1 = require("@main/middlewares/contenttype");
const cors = require('@main/middlewares/cors');
function SetupMiddlewares(app) {
    app.use(bodyparser_1.bodyParser);
    app.use(cors);
    app.use(contenttype_1.contentType);
}
exports.default = SetupMiddlewares;
//# sourceMappingURL=middlewares.js.map