import { MissingParamError } from '../errors/MissingParamError';
import { Validation } from '../interfaces/validation/validation';

export class RequiredFieldValidation implements Validation {
  constructor(
    private readonly fieldName: string,
  ) {}

  validate(input: any): Error | null {
    if (Array.isArray(input)) {
      if (input.some((file) => file.fieldname === this.fieldName)) {
        return null;
      }
    } else if (input && input[this.fieldName]) {
      return null;
    }
    return new MissingParamError(this.fieldName);
  }
}
