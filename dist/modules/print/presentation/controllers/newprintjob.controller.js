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
exports.NewPrintJobController = void 0;
const basecontroller_1 = require("@main/shared/controllers/basecontroller");
const http_helper_1 = require("@main/shared/helpers/http_helper/http.helper");
const uploadingfile_error_1 = require("@modules/print/domain/errors/uploadingfile.error");
class NewPrintJobController extends basecontroller_1.BaseController {
    constructor(newPrintJobValidation, newPrintJobUsecaseInterface) {
        super(newPrintJobValidation);
        this.newPrintJobValidation = newPrintJobValidation;
        this.newPrintJobUsecaseInterface = newPrintJobUsecaseInterface;
    }
    execute(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const PRINTJOB_FILE = httpRequest.files;
            const PRINTJOB_USER = httpRequest.userUid;
            const fileUploadedOrError = yield this.newPrintJobUsecaseInterface
                .execute({ PRINTJOB_FILE, PRINTJOB_USER });
            if (fileUploadedOrError instanceof uploadingfile_error_1.UploadingFileError) {
                return (0, http_helper_1.badRequest)(fileUploadedOrError);
            }
            return (0, http_helper_1.ok)(fileUploadedOrError.message);
        });
    }
}
exports.NewPrintJobController = NewPrintJobController;
//# sourceMappingURL=newprintjob.controller.js.map