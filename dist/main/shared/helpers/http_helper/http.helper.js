"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = exports.forbidden = exports.unauthorized = exports.badRequest = exports.noContent = exports.ok = void 0;
const server_error_1 = require("@main/shared/errors/server.error");
const ok = (body) => ({
    statusCode: 200,
    body,
});
exports.ok = ok;
const noContent = () => ({
    statusCode: 204,
});
exports.noContent = noContent;
const badRequest = (error) => ({
    statusCode: 400,
    body: error,
});
exports.badRequest = badRequest;
const unauthorized = (error) => ({
    statusCode: 401,
    body: error,
});
exports.unauthorized = unauthorized;
const forbidden = (error) => ({
    statusCode: 403,
    body: error,
});
exports.forbidden = forbidden;
const notFound = (error) => ({
    statusCode: 404,
    body: error,
});
exports.notFound = notFound;
const serverError = (error) => {
    const stack = error instanceof Error ? error.stack : undefined;
    return {
        statusCode: 500,
        body: new server_error_1.ServerError(stack),
    };
};
exports.serverError = serverError;
//# sourceMappingURL=http.helper.js.map