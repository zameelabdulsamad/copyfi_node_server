"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadingFileError = void 0;
class UploadingFileError extends Error {
    constructor() {
        super('Error uploading file');
        this.name = 'UploadingFileError';
    }
}
exports.UploadingFileError = UploadingFileError;
//# sourceMappingURL=uploadingfile.error.js.map