export class UploadingFileError extends Error {
  constructor() {
    super('Error uploading file');
    this.name = 'UploadingFileError';
  }
}
