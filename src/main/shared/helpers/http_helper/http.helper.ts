import { ServerError } from '@main/shared/errors/server.error';
import { HttpResponse } from '@main/shared/interfaces/http/httpresponse';

export const ok = <T = any> (message: any, data?: T): HttpResponse<T> => ({
  statusCode: 200,
  body: {
    status: 'success',
    message,
    data,
  },
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: {
    status: 'error',
    message: error.message,
  },
});

export const unauthorized = (error: Error): HttpResponse<Error> => ({
  statusCode: 401,
  body: {
    status: 'error',
    message: error.message,
  },
});

export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: 403,
  body: {
    status: 'error',
    message: error.message,
  },
});

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  body: {
    status: 'error',
    message: error.message,
  },
});

export const serverError = (error?: Error | unknown): HttpResponse<Error> => {
  const stack = error instanceof Error ? error.stack : undefined;
  return {
    statusCode: 500,
    body: {
      status: 'error',
      message: new ServerError(stack).message,
    },
  };
};
