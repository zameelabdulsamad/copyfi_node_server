import { badRequest, serverError } from '../helpers/http_helper/http.helper';
import { HttpRequest } from '../interfaces/http/httprequest';
import { HttpResponse } from '../interfaces/http/httpresponse';
import { Validation } from '../interfaces/validation/validation';

export abstract class BaseController {
  constructor(private readonly validation?: Validation) {}

  abstract execute(httpRequest: HttpRequest): Promise<HttpResponse>;
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation?.validate(httpRequest);
      if (error) {
        return badRequest(error);
      }
      return await this.execute(httpRequest);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}
