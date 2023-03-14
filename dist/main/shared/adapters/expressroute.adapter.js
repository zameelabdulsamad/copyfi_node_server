"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressRouteAdapter = void 0;
const expressRouteAdapter = (controller) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const httpRequest = {
        body: req.body,
        params: req.params,
        headers: req.headers,
        userId: req.userId,
    };
    const httpResponse = yield controller.handle(httpRequest);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
        res.status(httpResponse.statusCode).json(httpResponse.body);
    }
    else {
        res.status(httpResponse.statusCode).json({
            error: (_a = httpResponse.body) === null || _a === void 0 ? void 0 : _a.message,
        });
    }
});
exports.expressRouteAdapter = expressRouteAdapter;
//# sourceMappingURL=expressroute.adapter.js.map