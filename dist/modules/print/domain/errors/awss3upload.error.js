"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AWSS3UploadError = void 0;
class AWSS3UploadError extends Error {
    constructor() {
        super('Error occurred while uploading file to AWS S3');
        this.name = 'AWSS3UploadError';
    }
}
exports.AWSS3UploadError = AWSS3UploadError;
//# sourceMappingURL=awss3upload.error.js.map