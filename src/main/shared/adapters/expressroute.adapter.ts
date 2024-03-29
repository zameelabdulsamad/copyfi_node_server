import { Request, Response } from 'express';
import { BaseController } from '../controllers/basecontroller';
import { HttpRequest } from '../interfaces/http/httprequest';

export const expressRouteAdapter = (
  controller: BaseController,
) => async (req: Request, res: Response) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    params: req.params,
    headers: req.headers,
    userUid: req.userUid,
    files: req.files,
  };

  const httpResponse = await controller.handle(httpRequest);
  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    res.status(httpResponse.statusCode).json({
      status: 'error',
      message: httpResponse.body?.message,
    });
  }
};
