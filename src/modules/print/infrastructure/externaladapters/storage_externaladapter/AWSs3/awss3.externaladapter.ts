/* eslint-disable import/no-extraneous-dependencies */
import env from '@main/config/env';
import { injectable } from 'inversify';
import 'reflect-metadata';
import * as AWS from 'aws-sdk';
import { AWSS3ExternalAdapterInterface } from
  '@modules/print/infrastructure/interfaces/externaladapter_interface/storage/AWSs3/awss3.externaladapter';
import { AWSS3UploadError } from '@modules/print/domain/errors/awss3upload.error';

AWS.config.update({
  accessKeyId: env.s3Config.s3Accesskey!,
  secretAccessKey: env.s3Config.s3SecretAccesskey!,
  region: env.s3Config.s3BucketRegion!,
});

const s3 = new AWS.S3();

@injectable()
export class AWSS3ExternalAdapter implements AWSS3ExternalAdapterInterface {
  async savePrintjobFiles(savePrintjobFilesData: AWSS3ExternalAdapterInterface.SavePrintJobRequest):
  Promise<AWSS3ExternalAdapterInterface.SavePrintJobResponse> {
    try {
      const uploadPromises = savePrintjobFilesData.PRINTJOB_FILE.map(async (file) => {
        const params = {
          Bucket: env.s3Config.s3BucketName!,
          Key: `${Date.now()}-${file.originalname}`,
          Body: file.buffer,
        };
        return s3.upload(params).promise();
      });
      const results = await Promise.all(uploadPromises);
      return { data: { fileLocationS3: results.map((result) => result.Location) } };
    } catch (error) {
      return new AWSS3UploadError();
    }
  }
}
