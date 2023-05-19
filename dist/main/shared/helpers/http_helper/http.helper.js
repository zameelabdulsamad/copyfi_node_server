"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.notFound = exports.forbidden = exports.unauthorized = exports.badRequest = exports.noContent = exports.ok = void 0;
const server_error_1 = require("@main/shared/errors/server.error");
const ok = (message, data) => ({
    statusCode: 200,
    body: {
        status: 'success',
        message,
        data,
    },
});
exports.ok = ok;
const noContent = () => ({
    statusCode: 204,
});
exports.noContent = noContent;
const badRequest = (error) => ({
    statusCode: 400,
    body: {
        status: 'error',
        message: error.message,
    },
});
exports.badRequest = badRequest;
const unauthorized = (error) => ({
    statusCode: 401,
    body: {
        status: 'error',
        message: error.message,
    },
});
exports.unauthorized = unauthorized;
const forbidden = (error) => ({
    statusCode: 403,
    body: {
        status: 'error',
        message: error.message,
    },
});
exports.forbidden = forbidden;
const notFound = (error) => ({
    statusCode: 404,
    body: {
        status: 'error',
        message: error.message,
    },
});
exports.notFound = notFound;
const serverError = (error) => {
    const stack = error instanceof Error ? error.stack : undefined;
    return {
        statusCode: 500,
        body: {
            status: 'error',
            message: new server_error_1.ServerError(stack).message,
        },
    };
};
exports.serverError = serverError;
//# sourceMappingURL=http.helper.js.map