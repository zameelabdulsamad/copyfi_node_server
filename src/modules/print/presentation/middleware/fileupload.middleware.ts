/* eslint-disable import/no-extraneous-dependencies */
import multer from 'multer';

export const fileUpload = multer({
  storage: multer.memoryStorage(),
}).array('PRINTJOB_FILE');
