"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyparser_1 = require("@main/config/middlewares/bodyparser");
const contenttype_1 = require("@main/config/middlewares/contenttype");
const cors = require('@main/config/middlewares/cors');
function SetupMiddlewares(app) {
    app.use(bodyparser_1.bodyParser);
    app.use(cors);
    app.use(contenttype_1.contentType);
}
exports.default = SetupMiddlewares;
//# sourceMappingURL=middlewares.js.map