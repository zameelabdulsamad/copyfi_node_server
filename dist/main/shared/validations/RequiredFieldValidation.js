"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredFieldValidation = void 0;
const MissingParamError_1 = require("../errors/MissingParamError");
class RequiredFieldValidation {
    constructor(fieldName) {
        this.fieldName = fieldName;
    }
    validate(input) {
        if (Array.isArray(input)) {
            if (input.some((file) => file.fieldname === this.fieldName)) {
                return null;
            }
        }
        else if (input && input[this.fieldName]) {
            return null;
        }
        return new MissingParamError_1.MissingParamError(this.fieldName);
    }
}
exports.RequiredFieldValidation = RequiredFieldValidation;
//# sourceMappingURL=RequiredFieldValidation.js.map