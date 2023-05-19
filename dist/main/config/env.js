"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
// eslint-disable-next-line no-console
exports.default = {
    port: process.env.PORT,
    jwtSecurityKey: process.env.JWT_SECRET_KEY,
    postgresConfig: {
        postgresDbHost: process.env.POSTGRESQL_DB_HOST,
        postgresDbPort: process.env.POSTGRESQL_DB_PORT,
        postgresDbUser: process.env.POSTGRESQL_DB_USER,
        postgresDbPassword: process.env.POSTGRESQL_DB_PASSWORD,
        postgresDb: process.env.POSTGRESQL_DB,
    },
    twilioConfig: {
        twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
        twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
        twilioServiceSid: process.env.TWILIO_SERVICE_SID,
    },
    s3Config: {
        s3BucketName: process.env.S3_BUCKET_NAME,
        s3Accesskey: process.env.S3_ACCESS_KEY,
        s3SecretAccesskey: process.env.S3_SECRET_ACCESS_KEY,
        s3BucketRegion: process.env.S3_BUCKET_REGION,
        s3DefaultACL: process.env.S3_DEFAULT_FILES_ACL,
    },
};
//# sourceMappingURL=env.js.map