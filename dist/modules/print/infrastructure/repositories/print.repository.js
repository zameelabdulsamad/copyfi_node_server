"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrintRepository = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const uploadingfile_error_1 = require("@modules/print/domain/errors/uploadingfile.error");
const pgdatabaseaccess_error_1 = require("@modules/userauthentication/domain/errors/pgdatabaseaccess.error");
const awss3upload_error_1 = require("@modules/print/domain/errors/awss3upload.error");
let PrintRepository = class PrintRepository {
    constructor(printPGDBDataHandlerInterface, awsS3ExternalAdapterInterface) {
        this.printPGDBDataHandlerInterface = printPGDBDataHandlerInterface;
        this.awsS3ExternalAdapterInterface = awsS3ExternalAdapterInterface;
    }
    newPrintJob(newPrintJobData) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadToS3 = yield this.awsS3ExternalAdapterInterface.savePrintjobFiles(newPrintJobData);
            if (uploadToS3 instanceof awss3upload_error_1.AWSS3UploadError) {
                return new uploadingfile_error_1.UploadingFileError();
            }
            const printJobData = yield this.printPGDBDataHandlerInterface
                .savePrintjobFiles({
                fileLocation: uploadToS3.data.fileLocationS3,
                PRINTJOB_USER: newPrintJobData.PRINTJOB_USER,
            });
            if (printJobData instanceof pgdatabaseaccess_error_1.DatabaseAccessError) {
                return new uploadingfile_error_1.UploadingFileError();
            }
            return {
                message: 'Upload successful',
                data: {
                    printJobFile: uploadToS3.data.fileLocationS3,
                    printJobTime: printJobData.data.printJobTime,
                    printJobUid: printJobData.data.printJobUid,
                },
            };
        });
    }
};
PrintRepository = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('PrintPGDBDataHandlerInterface')),
    __param(1, (0, inversify_1.inject)('AWSS3ExternalAdapterInterface')),
    __metadata("design:paramtypes", [Object, Object])
], PrintRepository);
exports.PrintRepository = PrintRepository;
//# sourceMappingURL=print.repository.js.map