import { authMiddleware } from '@main/shared/adapters/authmiddleware.adapter';
import { expressRouteAdapter } from '@main/shared/adapters/expressroute.adapter';
import { Router } from 'express';
import { newPrintJobFactory } from '../factories/newprintjob.factory';
import { fileUpload } from '../middleware/fileupload.middleware';

export default function PrintRoutes(router:Router): void {
  router.post('/print/newprintjob', authMiddleware, fileUpload, expressRouteAdapter(newPrintJobFactory()));
}
