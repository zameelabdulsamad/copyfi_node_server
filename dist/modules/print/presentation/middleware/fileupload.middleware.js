"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
/* eslint-disable import/no-extraneous-dependencies */
const multer_1 = __importDefault(require("multer"));
exports.fileUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
}).array('PRINTJOB_FILE');
//# sourceMappingURL=fileupload.middleware.js.map