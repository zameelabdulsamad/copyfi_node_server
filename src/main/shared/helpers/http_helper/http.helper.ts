import { ServerError } from '@main/shared/errors/server.error';
import { HttpResponse } from '@main/shared/interfaces/http/httpresponse';

export const ok = <T = any> (message: T): HttpResponse<T> => ({
  statusCode: 200,
  body: message,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (error: Error): HttpResponse<Error> => ({
  statusCode: 401,
  body: error,
});

export const forbidden = (error: Error): HttpResponse<Error> => ({
  statusCode: 403,
  body: error,
});

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  body: error,
});

export const serverError = (error?: Error | unknown): HttpResponse<Error> => {
  const stack = error instanceof Error ? error.stack : undefined;
  return {
    statusCode: 500,
    body: new ServerError(stack),
  };
};
