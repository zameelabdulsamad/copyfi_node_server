export type HttpResponse<T = any> = {
  statusCode: number;
  body?: {
    status: string;
    message: string;
    data?: T;
  };
};
