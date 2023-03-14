"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequiredFieldValidation = void 0;
const MissingParamError_1 = require("../errors/MissingParamError");
class RequiredFieldValidation {
    constructor(fieldName) {
        this.fieldName = fieldName;
    }
    validate(input) {
        if (!input[this.fieldName]) {
            return new MissingParamError_1.MissingParamError(this.fieldName);
        }
        return null;
    }
}
exports.RequiredFieldValidation = RequiredFieldValidation;
//# sourceMappingURL=RequiredFieldValidation.js.map