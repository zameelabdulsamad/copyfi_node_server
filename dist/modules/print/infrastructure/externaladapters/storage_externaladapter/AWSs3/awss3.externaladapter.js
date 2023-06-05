"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSS3ExternalAdapter = void 0;
/* eslint-disable import/no-extraneous-dependencies */
const env_1 = __importDefault(require("@main/config/env"));
const inversify_1 = require("inversify");
require("reflect-metadata");
const AWS = __importStar(require("aws-sdk"));
const awss3upload_error_1 = require("@modules/print/domain/errors/awss3upload.error");
AWS.config.update({
    accessKeyId: env_1.default.s3Config.s3Accesskey,
    secretAccessKey: env_1.default.s3Config.s3SecretAccesskey,
    region: env_1.default.s3Config.s3BucketRegion,
});
const s3 = new AWS.S3();
let AWSS3ExternalAdapter = class AWSS3ExternalAdapter {
    savePrintjobFiles(savePrintjobFilesData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uploadPromises = savePrintjobFilesData.PRINTJOB_FILE.map((file) => __awaiter(this, void 0, void 0, function* () {
                    const params = {
                        Bucket: env_1.default.s3Config.s3BucketName,
                        Key: `${Date.now()}-${file.originalname}`,
                        Body: file.buffer,
                    };
                    return s3.upload(params).promise();
                }));
                const results = yield Promise.all(uploadPromises);
                return { data: { fileLocationS3: results.map((result) => result.Location) } };
            }
            catch (error) {
                return new awss3upload_error_1.AWSS3UploadError();
            }
        });
    }
};
AWSS3ExternalAdapter = __decorate([
    (0, inversify_1.injectable)()
], AWSS3ExternalAdapter);
exports.AWSS3ExternalAdapter = AWSS3ExternalAdapter;
//# sourceMappingURL=awss3.externaladapter.js.map