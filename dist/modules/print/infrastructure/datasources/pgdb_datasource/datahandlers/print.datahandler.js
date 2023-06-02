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
exports.PrintPGDBDataHandler = void 0;
const uploadingfile_error_1 = require("@modules/print/domain/errors/uploadingfile.error");
const inversify_1 = require("inversify");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
let PrintPGDBDataHandler = class PrintPGDBDataHandler {
    constructor(printJobDataModelEntity, userDataModelEntity) {
        this.printJobDataModelEntity = printJobDataModelEntity;
        this.userDataModelEntity = userDataModelEntity;
    }
    savePrintjobFiles(printJobFilesData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userDataModelEntity.createQueryBuilder('USERS')
                .select()
                .where('USERS.USER_UID = :USER_UID', { USER_UID: printJobFilesData.PRINTJOB_USER })
                .getOne();
            try {
                const newPrintJob = yield this.printJobDataModelEntity.save({
                    PRINTJOB_USER: user,
                    PRINTJOB_FILE: printJobFilesData.fileLocation,
                });
                return { data: newPrintJob };
            }
            catch (error) {
                return new uploadingfile_error_1.UploadingFileError();
            }
        });
    }
};
PrintPGDBDataHandler = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)('PrintJobDataModelEntityRepository')),
    __param(1, (0, inversify_1.inject)('UserDataModelEntityRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], PrintPGDBDataHandler);
exports.PrintPGDBDataHandler = PrintPGDBDataHandler;
//# sourceMappingURL=print.datahandler.js.map