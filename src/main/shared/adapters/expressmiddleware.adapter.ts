import { NextFunction, Request, Response } from 'express';
import { HttpRequest } from '../interfaces/http/httprequest';
import { BaseMiddleware } from '../middlewares/base.middleware';

export const expressMiddlewareAdapter = (
  middleware: BaseMiddleware,
) => async (req: Request, res: Response, next: NextFunction) => {
  const httpRequest: HttpRequest = {
    body: req.body,
    params: req.params,
    headers: req.headers,
    userUid: req.userUid,
    files: req.files,
  };
  const httpResponse = await middleware.handle(httpRequest);
  if (httpResponse.statusCode === 200) {
    Object.assign(req, httpResponse.body?.message);
    next();
  } else {
    res.status(httpResponse.statusCode).json({
      status: 'error',
      message: httpResponse.body?.message,
    });
  }
};
