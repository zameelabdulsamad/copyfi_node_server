import { serverError } from '../helpers/http_helper/http.helper';
import { HttpRequest } from '../interfaces/http/httprequest';
import { HttpResponse } from '../interfaces/http/httpresponse';

export abstract class BaseMiddleware {
  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.execute(httpRequest);
    } catch (error) {
      return serverError(error);
    }
  }
}
