export class AWSS3UploadError extends Error {
  constructor() {
    super('Error occurred while uploading file to AWS S3');
    this.name = 'AWSS3UploadError';
  }
}
